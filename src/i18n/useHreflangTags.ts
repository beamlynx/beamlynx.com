import { useEffect } from "react";
import { HTML_LANG, SUPPORTED_LOCALES } from "./config";
import { stripLocalePrefix } from "./paths";

const SITE_ORIGIN = "https://beamlynx.com";

// Points crawlers at the equivalent page in every language, including an
// x-default fallback to English. This is a client-side-rendered SPA with no
// prerendering, so these tags only exist post-hydration -- a real but
// partial SEO benefit compared to a prerendered/SSR site.
export function useHreflangTags(pathname: string, lang?: string): void {
  useEffect(() => {
    const basePath = stripLocalePrefix(pathname, lang);

    document.querySelectorAll("link[data-i18n-hreflang]").forEach((el) => el.remove());

    // Each page names its own beamlynx.com address as the one true copy.
    // This tells search engines which domain to list, even if the page is
    // reached through an old domain or a URL with extra query parameters.
    const canonical = document.createElement("link");
    canonical.rel = "canonical";
    canonical.href = `${SITE_ORIGIN}${pathname === "/" ? "/" : pathname.replace(/\/$/, "")}`;
    canonical.setAttribute("data-i18n-hreflang", "true");
    document.head.appendChild(canonical);

    const entries: Array<[string, string]> = [
      ["en", basePath],
      ...SUPPORTED_LOCALES.map(
        (locale) => [HTML_LANG[locale], `/${locale}${basePath === "/" ? "" : basePath}`] as [string, string],
      ),
      ["x-default", basePath],
    ];

    entries.forEach(([hreflang, path]) => {
      const link = document.createElement("link");
      link.rel = "alternate";
      link.hreflang = hreflang;
      link.href = `${SITE_ORIGIN}${path}`;
      link.setAttribute("data-i18n-hreflang", "true");
      document.head.appendChild(link);
    });
  }, [pathname, lang]);
}
