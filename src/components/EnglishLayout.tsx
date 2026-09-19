import { useLayoutEffect } from "react";
import { Outlet } from "react-router-dom";
import { setLocale } from "../i18n/config";
import { setAnalyticsLocale } from "../utils/analytics";

// Wraps every unprefixed route ("/", "/docs", "/posts", "/download").
// i18next is a global singleton -- once LocaleLayout has switched it to "es"
// or "zh" for a translated route, nothing else resets it back. Without this,
// navigating from "/zh/docs" to the unprefixed "/docs" (e.g. via the language
// switcher's "English" option) changes the URL but leaves the page rendering
// in the previous language, since react-i18next's t() reads the shared
// instance, not the URL. English resources are already bundled at init (no
// async fetch, unlike LocaleLayout's lazy-loaded bundles), so this resolves
// on the next microtask -- no loading gate needed, just correctness.
const EnglishLayout = () => {
  // Empty deps: runs once per mount only. AppContent itself calls
  // useTranslation, so an i18next language change re-renders it and
  // everything below -- including this component. Without the empty array
  // here, that re-render would re-run this effect, call changeLanguage("en")
  // again, and (if that re-emits languageChanged) loop forever, hanging the
  // tab. <Routes key={pathname}> already fully remounts this on every route
  // change, so "once per mount" is exactly the semantics we want anyway.
  useLayoutEffect(() => {
    setLocale("en");
    document.documentElement.lang = "en";
    setAnalyticsLocale("en");
  }, []);

  return <Outlet />;
};

export default EnglishLayout;
