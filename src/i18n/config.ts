import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import enCommon from "./locales/en/common.json";
import enHome from "./locales/en/home.json";
import enDownload from "./locales/en/download.json";
import enDocs from "./locales/en/docs.json";
import enDocsContent from "./locales/en/docsContent.json";
import enPosts from "./locales/en/posts.json";
import enFeatures from "./locales/en/features.json";
import enPrivacy from "./locales/en/privacy.json";
import enTerms from "./locales/en/terms.json";

export const SUPPORTED_LOCALES = ["es", "zh", "da"] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];
export type Locale = "en" | SupportedLocale;

export const NAMESPACES = ["common", "home", "download", "docs", "docsContent", "posts", "features", "privacy", "terms"] as const;

// Maps a URL locale segment to the value the <html lang> attribute and
// hreflang tags should use. zh-Hans (not "zh") is the correct IETF tag for
// Simplified Chinese; the URL segment stays short and typeable.
export const HTML_LANG: Record<Locale, string> = {
  en: "en",
  es: "es",
  zh: "zh-Hans",
  da: "da",
};

const loadedLocales = new Set<string>(["en"]);

// Locale JSON is lazy-loaded per language so a Danish visitor's bundle
// doesn't also pull the Chinese and Spanish translations.
const LOCALE_BUNDLES: Record<SupportedLocale, () => Promise<{ default: Record<string, object> }>> = {
  es: () => import("./locales/es/index"),
  zh: () => import("./locales/zh/index"),
  da: () => import("./locales/da/index"),
};

export async function loadLocale(locale: Locale): Promise<void> {
  if (loadedLocales.has(locale)) return;

  const { default: bundle } = await LOCALE_BUNDLES[locale as SupportedLocale]();
  for (const ns of NAMESPACES) {
    i18next.addResourceBundle(locale, ns, bundle[ns]);
  }

  loadedLocales.add(locale);
}

export async function setLocale(locale: Locale): Promise<void> {
  await loadLocale(locale);
  await i18next.changeLanguage(locale);
}

i18next.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  ns: NAMESPACES,
  defaultNS: "common",
  resources: {
    en: {
      common: enCommon,
      home: enHome,
      download: enDownload,
      docs: enDocs,
      docsContent: enDocsContent,
      posts: enPosts,
      features: enFeatures,
      privacy: enPrivacy,
      terms: enTerms,
    },
  },
  interpolation: {
    escapeValue: false,
  },
  react: {
    // Missing/loading keys during the brief window before a lazy locale
    // bundle finishes fetching should render nothing rather than the raw key.
    useSuspense: false,
  },
});

export default i18next;
