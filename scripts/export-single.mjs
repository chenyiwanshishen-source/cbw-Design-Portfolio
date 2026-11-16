import { build } from 'vite';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

// Usage: npm run export:html -- /absolute/path/portfolio.html
// Keep the source image names: the portfolio uses img[src*=...] selectors.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const destination = path.resolve(process.argv[2] || path.join(root, '..', 'chenbaiwan-portfolio.html'));
const out = fs.mkdtempSync(path.join(os.tmpdir(), 'portfolio-single-'));
const mime = {
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif',
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf',
  '.mp4': 'video/mp4', '.webm': 'video/webm', '.ico': 'image/x-icon', '.avif': 'image/avif',
};
// Editing masters are not used by ManPeekPortrait; it loads the optimized variants.
const excluded = new Set([
  'images/home/man-peek/man-peek.webp',
  'images/home/man-peek/man-peek-original.webp',
]);

try {
  await build({
    root,
    configFile: path.join(root, 'vite.config.ts'),
    base: './',
    logLevel: 'warn',
    build: {
      outDir: out,
      emptyOutDir: true,
      cssCodeSplit: false,
      assetsInlineLimit: 0,
      sourcemap: false,
      rollupOptions: { output: { inlineDynamicImports: true } },
    },
  });

  const assets = Object.create(null);
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const file = path.join(dir, entry.name);
      if (entry.isDirectory()) { walk(file); continue; }
      const key = path.relative(out, file).replaceAll('\\', '/');
      const type = mime[path.extname(file).toLowerCase()];
      if (!type || excluded.has(key)) continue;
      assets[key] = `data:${type};base64,${fs.readFileSync(file).toString('base64')}`;
    }
  }
  // Include every asset directory, including playground, school and root favicons.
  walk(out);

  const emittedAssets = fs.readdirSync(path.join(out, 'assets'));
  const cssFiles = emittedAssets.filter(file => file.endsWith('.css'));
  const jsFiles = emittedAssets.filter(file => file.endsWith('.js'));
  if (cssFiles.length !== 1 || jsFiles.length !== 1) {
    throw new Error(`Expected one JS and CSS bundle; got ${jsFiles.length}/${cssFiles.length}`);
  }

  function assetKey(url) {
    return decodeURIComponent(url.split(/[?#]/, 1)[0]).replace(/^(?:\.\.\/|\.\/|\/)+/, '');
  }
  let css = fs.readFileSync(path.join(out, 'assets', cssFiles[0]), 'utf8');
  const unresolvedCss = new Set();
  let embeddedCssUrls = 0;
  css = css.replace(/url\(\s*(['"]?)([^)'"\s]+)\1\s*\)/g, (all, quote, url) => {
    if (/^(?:data:|blob:|#)/.test(url)) return all;
    const embedded = assets[assetKey(url)];
    if (!embedded) { unresolvedCss.add(url); return all; }
    embeddedCssUrls += 1;
    const fragment = url.includes('#') ? url.slice(url.indexOf('#')) : '';
    return `url("${embedded}${fragment}")`;
  });
  if (unresolvedCss.size) {
    throw new Error(`Unembedded CSS assets: ${JSON.stringify([...unresolvedCss])}`);
  }

  let js = fs.readFileSync(path.join(out, 'assets', jsFiles[0]), 'utf8');
  // Keep the editor demo's optional insert-image example usable while offline.
  const placeholder = 'data:image/svg+xml;base64,' + Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><rect width="300" height="200" fill="#cccccc"/><text x="150" y="100" dominant-baseline="middle" text-anchor="middle" font-family="Arial,sans-serif" font-size="24" fill="#666666">300 × 200</text></svg>').toString('base64');
  const placeholderReplacements = js.split('https://via.placeholder.com/300x200').length - 1;
  js = js.replaceAll('https://via.placeholder.com/300x200', placeholder);

  // Fonts are already embedded in CSS; avoid duplicating their bytes in this map.
  const runtimeAssets = Object.fromEntries(Object.entries(assets).filter(([key]) => !key.startsWith('fonts/')));
  const shim = String.raw`(() => {
    const embeddedAssets = __ASSET_MAP__;
    const own = key => Object.prototype.hasOwnProperty.call(embeddedAssets, key);
    function assetURL(value) {
      if (value instanceof URL) value = value.href;
      if (typeof value !== 'string' || /^(?:data:|blob:|#)/.test(value)) return value;
      let pathname;
      let fragment = '';
      try {
        const parsed = new URL(value, document.baseURI);
        if (parsed.protocol !== 'file:' && parsed.origin !== location.origin) return value;
        pathname = decodeURIComponent(parsed.pathname);
        fragment = parsed.hash;
      } catch { pathname = value.split(/[?#]/, 1)[0]; }
      const direct = pathname.replace(/^(?:\.\.\/|\.\/|\/)+/, '');
      if (own(direct)) return embeddedAssets[direct] + fragment;
      const folder = pathname.match(/(?:^|\/)((?:images|assets|fonts)\/.*)$/);
      if (folder && own(folder[1])) return embeddedAssets[folder[1]] + fragment;
      const filename = pathname.slice(pathname.lastIndexOf('/') + 1);
      return own(filename) ? embeddedAssets[filename] + fragment : value;
    }
    // Dynamic CSS URLs use this explicitly before React assigns style.maskImage.
    // CSS named properties are not reliably defined on CSSStyleDeclaration.prototype.
    window.__PORTFOLIO_ASSET_URL__ = assetURL;

    const nativeAttr = Element.prototype.setAttribute;
    function imageSource(image, value) {
      const embedded = assetURL(value);
      if (embedded !== value) nativeAttr.call(image, 'srcset', embedded + ' 1x');
      else image.removeAttribute('srcset');
    }
    const imageSrc = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src');
    Object.defineProperty(HTMLImageElement.prototype, 'src', {
      ...imageSrc, set(value) { imageSource(this, value); imageSrc.set.call(this, value); },
    });
    for (const [proto, property] of [
      [HTMLImageElement.prototype, 'srcset'], [HTMLSourceElement.prototype, 'src'],
      [HTMLSourceElement.prototype, 'srcset'], [HTMLMediaElement.prototype, 'src'],
      [HTMLVideoElement.prototype, 'poster'], [HTMLLinkElement.prototype, 'href'],
    ]) {
      const descriptor = Object.getOwnPropertyDescriptor(proto, property);
      if (descriptor?.set && descriptor.configurable) Object.defineProperty(proto, property, {
        ...descriptor, set(value) { descriptor.set.call(this, assetURL(value)); },
      });
    }
    Element.prototype.setAttribute = function(name, value) {
      const key = name.toLowerCase();
      if (this instanceof HTMLImageElement && key === 'src') {
        imageSource(this, value);
        return nativeAttr.call(this, name, value);
      }
      return nativeAttr.call(this, name, /^(?:src|poster|srcset|href|xlink:href)$/.test(key) ? assetURL(value) : value);
    };
    const nativeFetch = window.fetch.bind(window);
    window.fetch = (input, options) => {
      const original = input instanceof Request ? input.url : input;
      const resolved = assetURL(original);
      if (resolved === original) return nativeFetch(input, options);
      return nativeFetch(input instanceof Request ? new Request(resolved, input) : resolved, options);
    };
  })();`.replace('__ASSET_MAP__', JSON.stringify(runtimeAssets));

  let html = fs.readFileSync(path.join(out, 'index.html'), 'utf8');
  html = html
    .replace(/<link[^>]+(?:fonts\.googleapis|fonts\.gstatic)[^>]*>/g, '')
    .replace(/<link[^>]+rel="(?:stylesheet|modulepreload|preload)"[^>]*>/g, '')
    .replace(/<script\b[^>]*\bsrc="[^"]+"[^>]*><\/script>/g, '')
    .replace(/(<link\b[^>]*\bhref=")([^"#]+)("[^>]*>)/g, (all, before, url, after) => {
      const embedded = assets[assetKey(url)];
      if (!embedded) throw new Error(`Unembedded HTML link: ${url}`);
      return before + embedded + after;
    });
  const protectScript = source => source.replace(/<\/script/gi, '<\\/script');
  html = html
    .replace('</head>', () => `<style>${css}</style></head>`)
    .replace('</body>', () => `<script>${protectScript(shim)}</script><script type="module">${protectScript(js)}</script></body>`);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, html);
  console.log(JSON.stringify({
    destination,
    bytes: Buffer.byteLength(html),
    sha256: createHash('sha256').update(html).digest('hex'),
    embeddedAssets: Object.keys(assets).length,
    embeddedIcons: Object.keys(assets).filter(key => key.startsWith('images/icons/')).length,
    embeddedFonts: Object.keys(assets).filter(key => key.startsWith('fonts/')).length,
    embeddedCssUrls,
    placeholderReplacements,
    unresolvedCss: [...unresolvedCss],
  }, null, 2));
} finally {
  fs.rmSync(out, { recursive: true, force: true });
}
