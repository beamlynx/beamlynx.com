import { SUPPORTED_LOCALES, type Locale } from "./config";

// "/es/download" -> "/download" (given lang="es"). Leaves unprefixed paths
// ("/download") and unrecognized lang segments untouched.
export function stripLocalePrefix(pathname: string, lang?: string): string {
  if (!lang || !(SUPPORTED_LOCALES as readonly string[]).includes(lang)) return pathname;
  const prefix = `/${lang}`;
  if (pathname === prefix) return "/";
  if (pathname.startsWith(`${prefix}/`)) return pathname.slice(prefix.length);
  return pathname;
}

// ("es", "/download") -> "/es/download". English has no prefix.
export function localizedPath(locale: Locale, basePath: string): string {
  if (locale === "en") return basePath;
  return `/${locale}${basePath === "/" ? "" : basePath}`;
}

// Reads the locale straight from the URL. Needed by components rendered as
// siblings of <Routes> (Navbar, Footer, ScrollToTop) -- they sit outside the
// matched route tree, so useParams() there never sees ":lang".
export function getLangFromPathname(pathname: string): Locale | undefined {
  const [, first] = pathname.split("/");
  return (SUPPORTED_LOCALES as readonly string[]).includes(first) ? (first as Locale) : undefined;
}
