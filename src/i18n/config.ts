import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import enCommon from "./locales/en/common.json";
import enHome from "./locales/en/home.json";
import enDownload from "./locales/en/download.json";
import enDocs from "./locales/en/docs.json";
import enDocsContent from "./locales/en/docsContent.json";
import enPosts from "./locales/en/posts.json";

export const SUPPORTED_LOCALES = ["es", "zh", "da"] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];
export type Locale = "en" | SupportedLocale;

export const NAMESPACES = ["common", "home", "download", "docs", "docsContent", "posts"] as const;

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
export async function loadLocale(locale: Locale): Promise<void> {
  if (loadedLocales.has(locale)) return;

  const [common, home, download, docs, docsContent, posts] = await Promise.all([
    import(`./locales/${locale}/common.json`),
    import(`./locales/${locale}/home.json`),
    import(`./locales/${locale}/download.json`),
    import(`./locales/${locale}/docs.json`),
    import(`./locales/${locale}/docsContent.json`),
    import(`./locales/${locale}/posts.json`),
  ]);

  i18next.addResourceBundle(locale, "common", common.default);
  i18next.addResourceBundle(locale, "home", home.default);
  i18next.addResourceBundle(locale, "download", download.default);
  i18next.addResourceBundle(locale, "docs", docs.default);
  i18next.addResourceBundle(locale, "docsContent", docsContent.default);
  i18next.addResourceBundle(locale, "posts", posts.default);

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
