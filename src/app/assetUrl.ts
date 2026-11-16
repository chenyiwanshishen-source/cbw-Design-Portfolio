declare global {
  interface Window {
    __PORTFOLIO_ASSET_URL__?: (url: string) => string;
  }
}

/** Resolve runtime CSS assets before React assigns an inline style. */
export function cssAssetUrl(url: string): string {
  // Only the standalone export installs a resolver; the website keeps its URLs.
  const resolved = typeof window === 'undefined'
    ? url
    : window.__PORTFOLIO_ASSET_URL__?.(url) ?? url;
  const escaped = resolved.replace(/[\0-\x1f\x7f"\\]/g, character =>
    `\\${character.charCodeAt(0).toString(16)} `,
  );
  return `url("${escaped}")`;
}
