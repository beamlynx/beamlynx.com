import { SUPPORTED_LOCALES, type Locale } from "./config";

const STORAGE_KEY = "beamlynx-locale";

// navigator.languages gives region-qualified tags ("zh-CN", "es-MX",
// "da-DK"), not our route segments -- match on the primary subtag only.
function normalizeToSupported(tag: string): Locale | null {
  const primary = tag.toLowerCase().split("-")[0];
  if ((SUPPORTED_LOCALES as readonly string[]).includes(primary)) {
    return primary as Locale;
  }
  return null;
}

function detectFromBrowser(): Locale {
  if (typeof navigator === "undefined") return "en";
  const candidates = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const tag of candidates) {
    const match = normalizeToSupported(tag);
    if (match) return match;
  }
  return "en";
}

export function persistLocale(locale: Locale): void {
  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // Storage unavailable (private mode, blocked) -- detection just runs
    // again next visit instead of persisting, which is a fine fallback.
  }
}

// Called once, synchronously, from a lazy useState initializer on the
// unprefixed "/" route: an explicit prior choice (including a deliberate
// "back to English") always wins over re-detecting from the browser.
export function resolveRootLocale(): Locale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || (SUPPORTED_LOCALES as readonly string[]).includes(stored ?? "")) {
      return stored as Locale;
    }
  } catch {
    // Storage unavailable -- detect but don't try to persist below.
    return detectFromBrowser();
  }

  const detected = detectFromBrowser();
  persistLocale(detected);
  return detected;
}
