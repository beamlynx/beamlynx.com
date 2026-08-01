export type DetectedOS = "mac" | "windows" | "linux";

/**
 * "Mobi" is the standard signal both iOS Safari and Android Chrome include
 * specifically to mark "this is a phone/mobile form factor" -- more reliable
 * than trying to separate mobile from desktop by OS name alone. Matters here
 * because Android's own UA string literally contains "Linux" (it's Linux-
 * kernel-based), so without this check a phone would get auto-selected onto
 * the Linux *desktop* tab, which is actively wrong -- beamlynx-desktop has
 * no mobile build at all.
 */
export function isMobileDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Mobi/.test(navigator.userAgent);
}

/**
 * navigator.platform is deprecated and userAgentData isn't universally
 * supported yet, so userAgent string sniffing is the pragmatic choice here.
 * Falls back to "mac" (arbitrary but harmless -- the user can just click a
 * different tab) if nothing matches, e.g. during SSR/prerendering where
 * navigator isn't defined, or on a mobile device where none of these
 * desktop OSes are the right answer anyway (see isMobileDevice()).
 */
export function detectOS(): DetectedOS {
  if (typeof navigator === "undefined") return "mac";
  const ua = navigator.userAgent;
  if (/Mac|iPhone|iPad|iPod/.test(ua)) return "mac";
  if (/Win/.test(ua)) return "windows";
  if (/Linux|X11/.test(ua)) return "linux";
  return "mac";
}
