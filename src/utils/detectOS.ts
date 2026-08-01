export type DetectedOS = "mac" | "windows" | "linux";

/**
 * navigator.platform is deprecated and userAgentData isn't universally
 * supported yet, so userAgent string sniffing is the pragmatic choice here.
 * Falls back to "mac" (arbitrary but harmless -- the user can just click a
 * different tab) if nothing matches, e.g. during SSR/prerendering where
 * navigator isn't defined.
 */
export function detectOS(): DetectedOS {
  if (typeof navigator === "undefined") return "mac";
  const ua = navigator.userAgent;
  if (/Mac|iPhone|iPad|iPod/.test(ua)) return "mac";
  if (/Win/.test(ua)) return "windows";
  if (/Linux|X11/.test(ua)) return "linux";
  return "mac";
}
