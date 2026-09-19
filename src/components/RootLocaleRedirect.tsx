import { useState, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { resolveRootLocale } from "../i18n/detect";

interface RootLocaleRedirectProps {
  children: ReactNode;
}

// Mounted only at "/", inside EnglishLayout, wrapping the (lazily-loaded)
// Home page. Resolves once per mount, synchronously, before the first paint
// decides what to render: an explicit prior choice (stored in localStorage,
// including a deliberate switch back to English) always wins over
// re-detecting the browser's language, so a visitor who picks English is
// never bounced back to a translated route. Takes Home as children rather
// than importing it directly so the English path still shares App.tsx's
// single lazy-loaded chunk. Setting the active i18next language and
// <html lang> is EnglishLayout's job (it covers every unprefixed route, not
// just this one) -- this component only decides whether to redirect.
const RootLocaleRedirect = ({ children }: RootLocaleRedirectProps) => {
  const [locale] = useState(() => resolveRootLocale());

  if (locale !== "en") {
    return <Navigate to={`/${locale}`} replace />;
  }

  return <>{children}</>;
};

export default RootLocaleRedirect;
