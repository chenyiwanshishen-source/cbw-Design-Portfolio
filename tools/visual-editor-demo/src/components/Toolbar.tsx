import { IconButton } from './IconButton';
import React, { useState, useEffect, useRef } from 'react';
import { useEditorStore } from '../store/useEditorStore';
import { translations } from '../i18n/translations';
import {
  MousePointer,
  Edit3,
  PlusSquare,
  Trash2,
  GitPullRequest,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Box,
  Heading,
  Type,
  Square,
  Image,
  CreditCard,
  Globe,
  Undo,
  Redo,
  FolderOpen,
  FileCode,
  FileText,
  Link,
  ChevronDown,
  Sparkles, Hand, X,
} from './Hugeicons';

export const Toolbar: React.FC<{floating?:boolean}> = ({floating=false}) => {
  const {
    connectionStatus,
    writeBackMode,
    setWriteBackMode,
    editorMode,
    setEditorMode,
    selectedElementDetails,
    deleteNode,
    insertNode,
    diffs,
    setDiffModalOpen,
    language,
    setLanguage,
    past = [],
    future = [],
    undo,
    redo,
    targetType,
    targetPath,
    recentTargets,
    setTargetType,
    setTargetPath,
    addRecentTarget,
  } = useEditorStore();

  const t = translations[language];
  const [showChanges, setShowChanges] = useState(false);
  const [showPalette, setShowPalette] = useState(false);
  const [showTargetHub, setShowTargetHub] = useState(false);
  const fileMenuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!showTargetHub) return;
    const closeOutside = (event: PointerEvent) => {
      if (!fileMenuRef.current?.contains(event.target as Node)) setShowTargetHub(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setShowTargetHub(false); };
    const closeFromPreview = () => { if (document.activeElement?.tagName === 'IFRAME') setShowTargetHub(false); };
    document.addEventListener('pointerdown', closeOutside, true);
    document.addEventListener('keydown', closeOnEscape);
    window.addEventListener('blur', closeFromPreview);
    return () => {
      document.removeEventListener('pointerdown', closeOutside, true);
      document.removeEventListener('keydown', closeOnEscape);
      window.removeEventListener('blur', closeFromPreview);
    };
  }, [showTargetHub]);


  const NODE_TEMPLATES = [
    {
      id: 'div',
      name: t.tplDiv,
      icon: Square,
      snippet: '<div className="p-4 bg-slate-100 rounded-lg shadow-sm">Container</div>',
    },
    {
      id: 'button',
      name: t.tplButton,
      icon: Box,
      snippet: '<IconButton className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow transition">Click Me</IconButton>',
    },
    {
      id: 'heading',
      name: t.tplHeading,
      icon: Heading,
      snippet: '<h2 className="text-2xl font-bold text-slate-900 tracking-tight">Headline Title</h2>',
    },
    {
      id: 'paragraph',
      name: t.tplParagraph,
      icon: Type,
      snippet: '<p className="text-slate-600 text-base leading-relaxed">Lorem ipsum text snippet content.</p>',
    },
    {
      id: 'image',
      name: t.tplImage,
      icon: Image,
      snippet: '<img src="https://via.placeholder.com/300x200" alt="Placeholder" className="rounded-md object-cover" />',
    },
    {
      id: 'card',
      name: t.tplCard,
      icon: CreditCard,
      snippet: '<div className="p-6 bg-white rounded-xl shadow-md border border-slate-200">Card Header</div>',
    },
  ];

  const handleInsert = (snippet: string) => {
    if (selectedElementDetails) {
      insertNode(
        selectedElementDetails.sourceFile,
        selectedElementDetails.sourceLine,
        'inside',
        snippet
      );
    } else {
      insertNode('src/App.tsx', 10, 'inside', snippet);
    }
    setShowPalette(false);
  };

  const handleDelete = () => {
    if (selectedElementDetails) {
      deleteNode(selectedElementDetails.sourceFile, selectedElementDetails.sourceLine);
    }
  };

  const handleOpenNativeDialog = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.setAttribute('webkitdirectory', '');
    input.multiple = true;
    input.onchange = (e: any) => {
      const files = Array.from(e.target.files || []) as File[];
      const file = files.find(f => /\.(tsx|jsx|html?|vue)$/.test(f.name)) || files[0];
      if (file) {
        const ext = file.name.split('.').pop()?.toLowerCase();
        let type: 'tsx' | 'html' | 'vue' | 'url' = 'html';
        if (ext === 'tsx' || ext === 'jsx') type = 'tsx';
        else if (ext === 'vue') type = 'vue';
        else if (ext === 'html' || ext === 'htm') type = 'html';

        const pathStr = file.name;
        setTargetType(type);
        setTargetPath(pathStr);
        addRecentTarget({ type, path: pathStr, name: file.name });
        setShowTargetHub(false);
      }
    };
    input.click();
  };

  const getTargetIcon = (type: string) => {
    switch (type) {
      case 'tsx':
        return <FileCode size={14} className="text-blue-400" />;
      case 'html':
        return <FileText size={14} className="text-orange-400" />;
      case 'vue':
        return <FileCode size={14} className="text-emerald-400" />;
      case 'url':
        return <Link size={14} className="text-purple-400" />;
      default:
        return <FileCode size={14} className="text-blue-400" />;
    }
  };

  const getTargetLabel = (type: string) => {
    switch (type) {
      case 'tsx':
        return t.targetTypeTsx;
      case 'html':
        return t.targetTypeHtml;
      case 'vue':
        return t.targetTypeVue;
      case 'url':
        return t.targetTypeUrl;
      default:
        return type.toUpperCase();
    }
  };

  if (floating) return <div className="demo-floating-tools">      {/* Mode Toggles: Select vs Edit vs Insert */}
      <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
        <IconButton
          onClick={() => setEditorMode('select')}
          className={`flex items-center space-x-1.5 px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            editorMode === 'select'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <MousePointer size={14} />
          <span>{t.modeSelect}</span>
        </IconButton>

        <IconButton
          onClick={() => setEditorMode('edit')}
          className={`flex items-center space-x-1.5 px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            editorMode === 'edit'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Edit3 size={14} />
          <span>{t.modeEdit}</span>
        </IconButton>

        <IconButton title="拖动画布" onClick={() => setEditorMode('pan')} className={editorMode === 'pan' ? 'bg-blue-600' : ''}><Hand /></IconButton>
        <div className="relative">
          <IconButton
            onClick={() => {
              setEditorMode('insert');
              setShowPalette(!showPalette);
            }}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              editorMode === 'insert' || showPalette
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <PlusSquare size={14} />
            <span>{t.modeInsert}</span>
          </IconButton>

          {/* Node Insertion Palette Dropdown */}
          {showPalette && (
            <div className="absolute bottom-12 left-0 w-64 bg-slate-900 border border-slate-800 rounded-lg shadow-2xl p-2 z-50">
              <div className="text-sm font-semibold uppercase text-slate-400 px-2 py-1 border-b border-slate-800 mb-1">
                {t.insertHeader}
              </div>
              <div className="space-y-1">
                {NODE_TEMPLATES.map((tpl) => {
                  const Icon = tpl.icon;
                  return (
                    <IconButton
                      key={tpl.id}
                      onClick={() => handleInsert(tpl.snippet)}
                      className="w-full flex items-center space-x-2.5 px-2.5 py-1.5 rounded text-sm text-left text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                    >
                      <Icon size={14} className="text-blue-400 shrink-0" />
                      <span>{tpl.name}</span>
                    </IconButton>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

        {/* Undo / Redo History Buttons */}
        <div className="demo-history-actions">
          <IconButton
            onClick={() => undo && undo()}
            disabled={!past || past.length === 0}
            className={`p-1.5 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ${
              past && past.length > 0
                ? 'text-slate-300 hover:text-white hover:bg-slate-800'
                : 'text-slate-600 cursor-not-allowed'
            }`}
            title="Undo / 撤销 (Cmd+Z / Ctrl+Z)"
            data-testid="undo-btn"
          >
            <Undo size={14} />
            <span className="hidden sm:inline text-sm">{(t as any).undo || (language === 'zh' ? '撤销' : 'Undo')}</span>
          </IconButton>
          <IconButton
            onClick={() => redo && redo()}
            disabled={!future || future.length === 0}
            className={`p-1.5 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ${
              future && future.length > 0
                ? 'text-slate-300 hover:text-white hover:bg-slate-800'
                : 'text-slate-600 cursor-not-allowed'
            }`}
            title="Redo / 重做 (Cmd+Shift+Z / Ctrl+Y)"
            data-testid="redo-btn"
          >
            <Redo size={14} />
            <span className="hidden sm:inline text-sm">{(t as any).redo || (language === 'zh' ? '重做' : 'Redo')}</span>
          </IconButton>
        </div>
        {/* Delete Node Button */}
        <IconButton
          onClick={handleDelete}
          disabled={!selectedElementDetails}
          className={`flex items-center space-x-1 px-2.5 py-1 rounded text-sm transition-colors ${
            selectedElementDetails
              ? 'text-red-400 hover:bg-red-950/40 hover:text-red-300 border border-red-900/50'
              : 'text-slate-600 border border-slate-800 cursor-not-allowed'
          }`}
          title="删除所选元素"
        >
          <Trash2 size={13} />
          <span>{t.deleteElement}</span>
        </IconButton>

</div>;

  return (
    <div className="h-12 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between text-slate-200 select-none z-20">
      {/* Brand / Logo + Target Selector Hub */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-sm tracking-tight text-white hidden sm:inline">{t.brandTitle}</span>
        </div>

        {/* Target Selector Hub Button & Dropdown */}
        <div className="relative" ref={fileMenuRef}>
          <button type="button" className="demo-file-trigger" onClick={() => setShowTargetHub(!showTargetHub)} aria-expanded={showTargetHub}>
            {getTargetIcon(targetType)}<span>{targetPath.split('/').pop() || 'App.tsx'}</span><ChevronDown size={16} />
          </button>
          {showTargetHub && (
            <div className="demo-file-menu">
              <div className="demo-file-label">当前文件</div>
              <button type="button" className="demo-file-item" onClick={() => setShowTargetHub(false)}>
                {getTargetIcon(targetType)}<span>{targetPath}</span><CheckCircle2 size={16} />
              </button>
              <div className="demo-file-label">最近编辑</div>
              {recentTargets.map((item, idx) => (
                <button type="button" className="demo-file-item" key={idx} onClick={() => {
                  setTargetType(item.type); setTargetPath(item.path); setShowTargetHub(false);
                }}>{getTargetIcon(item.type)}<span>{item.name}</span></button>
              ))}
              <button type="button" className="demo-file-item demo-file-open" onClick={handleOpenNativeDialog}>
                <FolderOpen size={18} /><span>打开本地文件夹</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="demo-writeback-header">
        <button type="button" className="demo-writeback-button" onClick={() => setShowChanges(!showChanges)} aria-expanded={showChanges}>
          <FileCode size={18} />写回源码
        </button>
        {showChanges && <div className="demo-writeback-popover">
          <div className="flex items-center justify-between"><strong>本次修改</strong><button type="button" aria-label="关闭修改预览" onClick={() => setShowChanges(false)}><X size={18} /></button></div>
          <p>{past.length ? `已有 ${past.length} 步修改，已应用到当前画布。` : '还没有修改，先在画布中选择元素并调整。'}</p>
        </div>}
      </div>


      {/* Write-Back Mode & Actions */}
      <div className="flex items-center space-x-3">
        {/* Language Switcher (Zh / En Toggle) */}
        <IconButton
          onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
          className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-sm text-slate-300 transition-colors"
          title="Switch Language / 切换语言"
        >
          <Globe size={14} className="text-blue-400" />
          <span className="font-semibold">{language === 'zh' ? '中文' : 'English'}</span>
        </IconButton>
      </div>
    </div>
  );
};

