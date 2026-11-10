(function () {
  if (typeof window === 'undefined') return;

  function reconcilePostHMRLocation(activeSelection, lineDeltaMap) {
    if (!activeSelection) return null;
    var sourceFile = activeSelection.sourceFile;
    var sourceLine = activeSelection.sourceLine;
    var componentName = activeSelection.componentName;
    var tagName = activeSelection.tagName;
    var index = activeSelection.index;

    var delta = (lineDeltaMap && lineDeltaMap[sourceFile]) || 0;
    var reanchoredLine = sourceLine + delta;

    var selector = '[data-source-file="' + sourceFile + '"][data-source-line="' + reanchoredLine + '"]';
    if (index !== undefined && index !== null) {
      selector += '[data-source-index="' + index + '"]';
    }
    var element = document.querySelector(selector);

    if (!element) {
      var candidates = Array.from(document.querySelectorAll('[data-source-file="' + sourceFile + '"]'));
      element = candidates.find(function (el) {
        var matchComp = !componentName || el.getAttribute('data-source-component') === componentName;
        var matchTag = !tagName || el.tagName.toLowerCase() === tagName.toLowerCase();
        var matchIdx = index === undefined || index === null || el.getAttribute('data-source-index') === String(index);
        return matchComp && matchTag && matchIdx;
      }) || null;
    }

    return element;
  }

  function buildDomTree(root) {
    var targetRoot = root || document.body || document.documentElement;

    function buildNode(el) {
      var sourceFile = el.getAttribute('data-source-file') || '';
      var sourceLineStr = el.getAttribute('data-source-line');
      var sourceLine = sourceLineStr !== null ? parseInt(sourceLineStr, 10) : 0;
      var sourceColumnStr = el.getAttribute('data-source-column');
      var sourceColumn = sourceColumnStr !== null ? parseInt(sourceColumnStr, 10) : undefined;
      var tagName = el.tagName ? el.tagName.toLowerCase() : '';
      var componentName = el.getAttribute('data-source-component') || undefined;

      var id = sourceFile && sourceLine
        ? sourceFile + ':' + sourceLine + ':' + (sourceColumn || 0) + ':' + tagName
        : tagName + '-' + Math.random().toString(36).substring(2, 9);

      var attributes = {};
      if (el.attributes) {
        for (var i = 0; i < el.attributes.length; i++) {
          var attr = el.attributes[i];
          attributes[attr.name] = attr.value;
        }
      }

      var classList = Array.from(el.classList);
      var children = [];
      var internalTags = new Set(['script', 'style', 'noscript', 'template']);

      for (var j = 0; j < el.children.length; j++) {
        var child = el.children[j];
        if (!internalTags.has(child.tagName.toLowerCase())) {
          children.push(buildNode(child));
        }
      }

      return {
        id: id,
        name: componentName || tagName,
        kind: componentName ? 'custom-component' : 'html-element',
        sourceFile: sourceFile,
        sourceLine: sourceLine,
        sourceColumn: sourceColumn,
        attributes: attributes,
        classList: classList,
        children: children,
      };
    }

    return buildNode(targetRoot.querySelector('#root') || targetRoot);
  }

  function RuntimeBridge(options) {
    options = options || {};
    this.options = options;
    this.targetWindow = options.targetWindow || window;
    this.parentWindow = options.parentWindow || (window.parent || window.opener || window);

    var token = options.token;
    if (!token && window.location && window.location.search) {
      var params = new URLSearchParams(window.location.search);
      token = params.get('__codex_token') || undefined;
    }
    this.token = token || 'dev-token';

    var origin = options.devServerOrigin;
    if (!origin && window.location && window.location.origin && window.location.origin !== 'null') {
      origin = window.location.origin;
    }
    this.devServerOrigin = origin || 'http://localhost:5173';

    this.inspectorEnabled = options.inspectorEnabled !== undefined ? options.inspectorEnabled : true;
    this.inspectorMode = options.inspectorMode || 'select';
    this.isListening = false;
    this.mouseOverRafId = null;
    this.pendingMouseOverEvent = null;

    this.messageHandler = this.handleMessage.bind(this);
    this.mouseOverHandler = this.handleMouseOver.bind(this);
    this.clickHandler = this.handleClick.bind(this);
    this.scrollHandler = this.handleScroll.bind(this);
    this.resizeHandler = this.handleResize.bind(this);
  }

  RuntimeBridge.prototype.init = function () {
    if (this.isListening) return this;
    if (this.targetWindow && this.targetWindow.addEventListener) {
      this.targetWindow.addEventListener('message', this.messageHandler);
      this.targetWindow.addEventListener('mouseover', this.mouseOverHandler, { capture: true });
      this.targetWindow.addEventListener('click', this.clickHandler, { capture: true });
      this.targetWindow.addEventListener('scroll', this.scrollHandler);
      this.targetWindow.addEventListener('resize', this.resizeHandler);
    }
    var self = this, drag = null;
    this.targetWindow.addEventListener('pointerdown', function(e) {
      if (!self.isInspectorEnabled() || e.button !== 0) return;
      var el=e.target.closest('[data-source-file]');
      if (!el || /^(INPUT|TEXTAREA|BODY|MAIN|HEADER)$/.test(el.tagName)) return;
      drag={el:el,parent:el.parentElement,originalNext:el.nextSibling,x:e.clientX,y:e.clientY,active:false,display:el.style.display};
    }, true);
    this.targetWindow.addEventListener('pointermove', function(e) {
      if(!drag) return;
      if(!drag.active && Math.hypot(e.clientX-drag.x,e.clientY-drag.y)<6) return;
      e.preventDefault();
      var doc=self.targetWindow.document;
      if(!drag.active){
        drag.active=true;self.isReordering=true;
        drag.horizontal=self.targetWindow.getComputedStyle(drag.parent).flexDirection.startsWith('row') && self.targetWindow.getComputedStyle(drag.parent).display.includes('flex');
        drag.siblings=Array.from(drag.parent.children).filter(function(el){return el!==drag.el && !/^(SCRIPT|STYLE)$/.test(el.tagName);});
        drag.centers=drag.siblings.map(function(el){var r=el.getBoundingClientRect();return drag.horizontal?r.left+r.width/2:r.top+r.height/2;});
        drag.lastNext=drag.el.nextElementSibling;
        drag.animations=new Map();
        drag.parentMinHeight=drag.parent.style.minHeight;
        drag.parent.style.minHeight=drag.parent.getBoundingClientRect().height+'px';
        var r=drag.el.getBoundingClientRect(), computed=self.targetWindow.getComputedStyle(drag.el);
        drag.dx=drag.x-r.left;drag.dy=drag.y-r.top;
        drag.placeholder=doc.createElement('div');
        drag.placeholder.setAttribute('data-drag-placeholder','true');
        drag.placeholder.style.cssText='box-sizing:border-box;pointer-events:none;background:rgba(34,88,244,.06);border:1px dashed #a8beff;border-radius:8px;flex-shrink:0;';
        drag.placeholder.style.width=r.width+'px';drag.placeholder.style.height=r.height+'px';
        drag.placeholder.style.margin=computed.margin;
        drag.parent.insertBefore(drag.placeholder,drag.el);
        drag.ghost=drag.el.cloneNode(true);
        drag.ghost.removeAttribute('data-source-file');
        for(var i=0;i<computed.length;i++){var prop=computed[i];drag.ghost.style.setProperty(prop,computed.getPropertyValue(prop));}
        drag.ghost.style.cssText+=';position:fixed;pointer-events:none;z-index:2147483647;margin:0;opacity:.9;box-shadow:0 8px 24px rgba(26,28,36,.16);width:'+r.width+'px;height:'+r.height+'px;';
        doc.body.appendChild(drag.ghost);drag.el.style.display='none';
        self.postToHost('ELEMENT_CLICKED',null);self.postToHost('ELEMENT_HOVERED',null);
      }
      drag.ghost.style.left=(e.clientX-drag.dx)+'px';drag.ghost.style.top=(e.clientY-drag.dy)+'px';
      var siblings=drag.siblings;
      var point=drag.horizontal?e.clientX:e.clientY;
      var next=siblings.find(function(el,i){return point<drag.centers[i];})||null;
      if(drag.lastNext===next) return;
      drag.lastNext=next;
      drag.animations.forEach(function(animation){animation.cancel();});drag.animations.clear();
      var before=siblings.map(function(el){return el.getBoundingClientRect();});
      drag.parent.insertBefore(drag.placeholder,next);
      if(!self.targetWindow.matchMedia('(prefers-reduced-motion: reduce)').matches){
        siblings.forEach(function(el,i){var after=el.getBoundingClientRect();var animation=el.animate([{transform:'translate('+(before[i].left-after.left)+'px,'+(before[i].top-after.top)+'px)'},{transform:'translate(0,0)'}],{duration:160,easing:'ease-out'});drag.animations.set(el,animation);});
      }
    }, {capture:true,passive:false});
    var finish=function(e,cancel){
      if(!drag) return;
      var current=drag;drag=null;self.isReordering=false;
      if(!current.active) return;
      e.preventDefault();
      if(cancel) current.parent.insertBefore(current.el,current.originalNext);
      else current.parent.insertBefore(current.el,current.placeholder);
      current.animations.forEach(function(animation){animation.cancel();});
      current.parent.style.minHeight=current.parentMinHeight;
      current.el.style.display=current.display;current.placeholder.remove();current.ghost.remove();
      self.postToHost('DOM_TREE_RESPONSE',{root:buildDomTree(self.targetRoot)});
      self.handleClick({target:current.el,preventDefault:function(){},stopPropagation:function(){},stopImmediatePropagation:function(){}});
      self.suppressNextClick=true;
    };
    this.targetWindow.addEventListener('pointerup',function(e){finish(e,false);},true);
    this.targetWindow.addEventListener('pointercancel',function(e){finish(e,true);},true);
    this.isListening = true;
    return this;
  };

  RuntimeBridge.prototype.destroy = function () {
    if (!this.isListening) return;
    if (this.targetWindow && this.targetWindow.removeEventListener) {
      this.targetWindow.removeEventListener('message', this.messageHandler);
      this.targetWindow.removeEventListener('mouseover', this.mouseOverHandler, { capture: true });
      this.targetWindow.removeEventListener('click', this.clickHandler, { capture: true });
      this.targetWindow.removeEventListener('scroll', this.scrollHandler);
      this.targetWindow.removeEventListener('resize', this.resizeHandler);
    }
    var win = this.targetWindow || (typeof window !== 'undefined' ? window : null);
    var cancelRaf = (win && win.cancelAnimationFrame) || (typeof cancelAnimationFrame !== 'undefined' ? cancelAnimationFrame : null);
    if (cancelRaf && this.mouseOverRafId !== null) {
      cancelRaf(this.mouseOverRafId);
    }
    this.mouseOverRafId = null;
    this.pendingMouseOverEvent = null;
    this.isListening = false;
  };

  RuntimeBridge.prototype.isInspectorEnabled = function () {
    return this.inspectorEnabled && this.inspectorMode !== 'off';
  };

  RuntimeBridge.prototype.setInspectorEnabled = function (enabled, mode) {
    this.inspectorEnabled = enabled;
    if (mode) {
      this.inspectorMode = mode;
    }
    if (!this.isInspectorEnabled()) {
      var win = this.targetWindow || (typeof window !== 'undefined' ? window : null);
      var cancelRaf = (win && win.cancelAnimationFrame) || (typeof cancelAnimationFrame !== 'undefined' ? cancelAnimationFrame : null);
      if (cancelRaf && this.mouseOverRafId !== null) {
        cancelRaf(this.mouseOverRafId);
      }
      this.mouseOverRafId = null;
      this.pendingMouseOverEvent = null;
    }
  };

  RuntimeBridge.prototype.postToHost = function (type, payload) {
    var message = {
      token: this.token,
      timestamp: Date.now(),
      type: type,
      payload: payload,
    };
    if (this.parentWindow && this.parentWindow.postMessage) {
      this.parentWindow.postMessage(message, '*');
    }
  };

  RuntimeBridge.prototype.handleMessage = function (event) {
    if (this.devServerOrigin) {
      try {
        var expectedOrigin = new URL(this.devServerOrigin).origin;
        if (event.origin && event.origin !== expectedOrigin && event.origin !== 'null') {
          return;
        }
      } catch (_) {
        if (event.origin && event.origin !== this.devServerOrigin && event.origin !== 'null') {
          return;
        }
      }
    }

    var data = event.data;
    if (!data || typeof data !== 'object' || data.token !== this.token) {
      return;
    }

    switch (data.type) {
      case 'ENABLE_INSPECTOR':
        if (data.payload) {
          this.setInspectorEnabled(
            data.payload.enabled !== undefined ? data.payload.enabled : true,
            data.payload.mode
          );
        }
        break;

      case 'MUTATE_DOM_PREVIEW':
        if (data.payload) {
          this.handleMutateDomPreview(data.payload);
        }
        break;

      case 'REQUEST_DOM_TREE':
        var root = buildDomTree();
        this.postToHost('DOM_TREE_RESPONSE', { root: root });
        break;

      case 'HIGHLIGHT_ELEMENT':
        if (data.payload) {
          this.handleHighlightElement(data.payload);
        }
        break;
    }
  };

  RuntimeBridge.prototype.handleMouseOver = function (event) {
    if (!this.isInspectorEnabled() || this.isReordering) return;

    this.pendingMouseOverEvent = event;
    if (this.mouseOverRafId !== null) return;

    var self = this;
    var win = this.targetWindow || (typeof window !== 'undefined' ? window : null);
    var raf = (win && win.requestAnimationFrame) || (typeof requestAnimationFrame !== 'undefined' ? requestAnimationFrame : null);

    if (raf) {
      this.mouseOverRafId = raf(function () {
        self.mouseOverRafId = null;
        if (self.pendingMouseOverEvent) {
          var pendingEvt = self.pendingMouseOverEvent;
          self.pendingMouseOverEvent = null;
          self.processMouseOver(pendingEvt);
        }
      });
    } else {
      this.processMouseOver(event);
      this.pendingMouseOverEvent = null;
    }
  };

  RuntimeBridge.prototype.processMouseOver = function (event) {
    if (!this.isInspectorEnabled()) return;
    if(this.suppressNextClick){this.suppressNextClick=false;event.preventDefault();event.stopImmediatePropagation();return;}

    var target = (event.target && event.target.closest) ? event.target.closest('[data-source-file]') : null;
    if (!target) return;

    var sourceFile = target.getAttribute('data-source-file') || '';
    var sourceLineStr = target.getAttribute('data-source-line');
    var sourceLine = sourceLineStr ? parseInt(sourceLineStr, 10) : 0;
    var sourceColumnStr = target.getAttribute('data-source-column');
    var sourceColumn = sourceColumnStr ? parseInt(sourceColumnStr, 10) : undefined;
    var tagName = target.tagName.toLowerCase();
    var componentName = target.getAttribute('data-source-component') || undefined;

    var rect = target.getBoundingClientRect();
    var win = this.targetWindow || window;
    var scrollX = win.scrollX || win.pageXOffset || 0;
    var scrollY = win.scrollY || win.pageYOffset || 0;

    var boundingRect = {
      x: rect.left + scrollX,
      y: rect.top + scrollY,
      width: rect.width,
      height: rect.height,
    };

    var payload = {
      sourceFile: sourceFile,
      sourceLine: sourceLine,
      sourceColumn: sourceColumn,
      tagName: tagName,
      componentName: componentName,
      boundingRect: boundingRect,
      classList: Array.from(target.classList),
    };

    this.postToHost('ELEMENT_HOVERED', payload);
  };

  RuntimeBridge.prototype.handleClick = function (event) {
    if (!this.isInspectorEnabled()) return;

    var target = (event.target && event.target.closest) ? event.target.closest('[data-source-file]') : null;
    var raw = event.target;
    if (!target || (event.isTrusted && raw && (raw === this.targetRoot || raw.id === 'root' || raw.tagName === 'BODY' || raw.tagName === 'MAIN'))) {
      this.postToHost('ELEMENT_CLICKED', null);
      this.postToHost('ELEMENT_HOVERED', null);
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    var sourceFile = target.getAttribute('data-source-file') || '';
    var sourceLineStr = target.getAttribute('data-source-line');
    var sourceLine = sourceLineStr ? parseInt(sourceLineStr, 10) : 0;
    var sourceColumnStr = target.getAttribute('data-source-column');
    var sourceColumn = sourceColumnStr ? parseInt(sourceColumnStr, 10) : undefined;
    var tagName = target.tagName.toLowerCase();
    var componentName = target.getAttribute('data-source-component') || undefined;

    var win = this.targetWindow || window;
    var scrollX = win.scrollX || win.pageXOffset || 0;
    var scrollY = win.scrollY || win.pageYOffset || 0;
    var rect = target.getBoundingClientRect();

    var boundingRect = {
      x: rect.left + scrollX,
      y: rect.top + scrollY,
      width: rect.width,
      height: rect.height,
    };

    var style = null;
    if (win.getComputedStyle) {
      style = win.getComputedStyle(target);
    }

    function parsePx(val) {
      if (!val) return 0;
      var parsed = parseFloat(val);
      return isNaN(parsed) ? 0 : parsed;
    }

    var boxModel = {
      margin: {
        top: style ? parsePx(style.marginTop) : 0,
        right: style ? parsePx(style.marginRight) : 0,
        bottom: style ? parsePx(style.marginBottom) : 0,
        left: style ? parsePx(style.marginLeft) : 0,
      },
      padding: {
        top: style ? parsePx(style.paddingTop) : 0,
        right: style ? parsePx(style.paddingRight) : 0,
        bottom: style ? parsePx(style.paddingBottom) : 0,
        left: style ? parsePx(style.paddingLeft) : 0,
      },
    };

    var computedStyles = {};
    if (style) {
      for (var i = 0; i < style.length; i++) {
        var key = style[i];
        computedStyles[key] = style.getPropertyValue(key);
      }
      ['display', 'position', 'color', 'backgroundColor', 'fontSize', 'fontWeight', 'lineHeight', 'padding', 'gap', 'borderRadius', 'width', 'height', 'flexDirection', 'justifyContent', 'alignItems'].forEach(function (prop) {
        if (style[prop] !== undefined) {
          computedStyles[prop] = String(style[prop]);
        }
      });
    }

    var attributes = {};
    if (target.attributes) {
      for (var k = 0; k < target.attributes.length; k++) {
        var attr = target.attributes[k];
        attributes[attr.name] = attr.value;
      }
    }

    var inlineStyles = {};
    if (target.style) {
      for (var m = 0; m < target.style.length; m++) {
        var propName = target.style[m];
        inlineStyles[propName] = target.style.getPropertyValue(propName);
      }
    }

    var payload = {
      id: sourceFile + ':' + sourceLine + ':' + (sourceColumn || 0) + ':' + tagName,
      sourceFile: sourceFile,
      sourceLine: sourceLine,
      sourceColumn: sourceColumn,
      tagName: tagName,
      componentName: componentName,
      textContext: target.textContent ? target.textContent.trim() : '',
      classList: Array.from(target.classList),
      inlineStyles: inlineStyles,
      boxModel: boxModel,
      computedStyles: computedStyles,
      boundingRect: boundingRect,
      attributes: attributes,
    };

    this.postToHost('ELEMENT_CLICKED', payload);
  };

  RuntimeBridge.prototype.handleScroll = function () {
    var win = this.targetWindow || window;
    var scrollX = win.scrollX || win.pageXOffset || 0;
    var scrollY = win.scrollY || win.pageYOffset || 0;
    this.postToHost('IFRAME_SCROLLED', { scrollX: scrollX, scrollY: scrollY });
  };

  RuntimeBridge.prototype.handleResize = function () {
    var win = this.targetWindow || window;
    var width = win.innerWidth || 0;
    var height = win.innerHeight || 0;
    this.postToHost('IFRAME_RESIZED', { width: width, height: height });
  };

  RuntimeBridge.prototype.handleMutateDomPreview = function (payload) {
    var sourceFile = payload.sourceFile;
    var line = payload.line;
    var inlineStyles = payload.inlineStyles;
    var textContent = payload.textContent;
    var classList = payload.classList;

    var element = document.querySelector('[data-source-file="' + sourceFile + '"][data-source-line="' + line + '"]');
    if (!element) return;

    if (inlineStyles && typeof inlineStyles === 'object') {
      element.style.cssText = '';
      Object.keys(inlineStyles).forEach(function (prop) {
        element.style.setProperty(prop.replace(/[A-Z]/g, function(m) { return '-' + m.toLowerCase(); }), inlineStyles[prop]);
      });
    }

    if (textContent !== undefined) {
      element.textContent = textContent;
    }

    if (classList && Array.isArray(classList)) {
      element.className = classList.join(' ');
    }
    var self = this;
    requestAnimationFrame(function() { self.handleClick({target:element,preventDefault:function(){},stopPropagation:function(){},stopImmediatePropagation:function(){}}); });
  };

  RuntimeBridge.prototype.handleHighlightElement = function (payload) {
    var sourceFile = payload.sourceFile;
    var line = payload.line;
    var element = document.querySelector('[data-source-file="' + sourceFile + '"][data-source-line="' + line + '"]');
    if (element && element.scrollIntoView) {
      element.scrollIntoView({ behavior: 'instant', block: 'nearest' });
      this.handleClick({target:element,preventDefault:function(){},stopPropagation:function(){},stopImmediatePropagation:function(){}});
    }
  };

  function initRuntimeBridge(options) {
    var bridge = new RuntimeBridge(options);
    bridge.init();
    window.__CODEX_RUNTIME_BRIDGE_INSTANCE__ = bridge;
    return bridge;
  }

  // Export globally
  window.reconcilePostHMRLocation = reconcilePostHMRLocation;
  window.buildDomTree = buildDomTree;
  window.RuntimeBridge = RuntimeBridge;
  window.initRuntimeBridge = initRuntimeBridge;
  window.__CODEX_RUNTIME_BRIDGE__ = {
    reconcilePostHMRLocation: reconcilePostHMRLocation,
    buildDomTree: buildDomTree,
    RuntimeBridge: RuntimeBridge,
    initRuntimeBridge: initRuntimeBridge,
  };

  // Auto initialize when loaded in browser/iframe
  initRuntimeBridge();
})();
