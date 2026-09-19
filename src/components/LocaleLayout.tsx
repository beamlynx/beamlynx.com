import { useEffect, useState } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { HTML_LANG, SUPPORTED_LOCALES, setLocale, type Locale } from "../i18n/config";
import { persistLocale } from "../i18n/detect";
import { setAnalyticsLocale } from "../utils/analytics";
import LoadingIndicator from "./LoadingIndicator";

// Wraps every "/:lang/*" route. Loads that locale's translation bundle,
// applies it, and persists the choice -- this is how visiting a localized
// URL directly (a shared link, or the language switcher) becomes the
// visitor's remembered preference for next time.
const LocaleLayout = () => {
  const { lang } = useParams<{ lang: string }>();
  const isSupported = (SUPPORTED_LOCALES as readonly string[]).includes(lang ?? "");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isSupported) return;

    let cancelled = false;
    setReady(false);

    setLocale(lang as Locale).then(() => {
      if (cancelled) return;
      document.documentElement.lang = HTML_LANG[lang as Locale];
      persistLocale(lang as Locale);
      setAnalyticsLocale(lang as Locale);
      setReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, [lang, isSupported]);

  if (!isSupported) {
    return <Navigate to="/" replace />;
  }

  if (!ready) {
    return <LoadingIndicator className="h-screen" />;
  }

  return <Outlet />;
};

export default LocaleLayout;
