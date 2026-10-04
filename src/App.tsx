import { BrowserRouter as Router, Routes, Route, useLocation, useParams, Navigate } from 'react-router-dom';
import { getLangFromPathname } from './i18n/paths';
import Documentation from './pages/Documentation';
import { ColorPaletteProvider } from './contexts/ColorPaletteContext';
import Navbar from './components/Navbar';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import Footer from './components/Footer';
import { useEffect, lazy, Suspense } from 'react';
import LoadingIndicator from './components/LoadingIndicator';
import { trackPageview } from './utils/analytics';
import RootLocaleRedirect from './components/RootLocaleRedirect';
import EnglishLayout from './components/EnglishLayout';
import LocaleLayout from './components/LocaleLayout';
import { useHreflangTags } from './i18n/useHreflangTags';
import { useTranslation } from 'react-i18next';

const Home = lazy(() => import('./pages/Home'));
const Posts = lazy(() => import('./pages/Posts'));
const Download = lazy(() => import('./pages/Download'));

// Old URL from before the "Getting Started" -> "Download" rename, locale-aware.
const LocaleSetupRedirect = () => {
  const { lang } = useParams<{ lang: string }>();
  return <Navigate to={`/${lang}/download`} replace />;
};

// Scroll to top and refresh cross-language SEO tags on route change. Page
// <title> is set declaratively by each page component (React 19 hoists it) --
// this must not also set document.title imperatively, or the two fight.
function ScrollToTop() {
  const location = useLocation();
  const lang = getLangFromPathname(location.pathname);
  useHreflangTags(location.pathname, lang);

  useEffect(() => {
    // A link with a hash (the navbar's "Try it" -> /#try) scrolls itself
    // once its page has rendered; see Home.tsx.
    if (!window.location.hash) window.scrollTo(0, 0);
    trackPageview(location.pathname);
  }, [location.pathname]);

  return null;
}

const AppContent = () => {
  const location = useLocation();
  const { t } = useTranslation('common');

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />
      <ScrollToTop />
      <main className="flex-1 relative">
        <AnimatePresence mode="wait">
          <Suspense fallback={<LoadingIndicator className="h-screen" text={t('loading.page')} />}>
            <Routes location={location} key={location.pathname}>
              <Route element={<EnglishLayout />}>
                <Route path="/" element={<RootLocaleRedirect><Home /></RootLocaleRedirect>} />
                <Route path="/docs" element={<Documentation />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/download" element={<Download />} />
                {/* Old URL from before the "Getting Started" -> "Download" rename */}
                <Route path="/setup" element={<Navigate to="/download" replace />} />
              </Route>

              <Route path="/:lang" element={<LocaleLayout />}>
                <Route index element={<Home />} />
                <Route path="docs" element={<Documentation />} />
                <Route path="posts" element={<Posts />} />
                <Route path="download" element={<Download />} />
                <Route path="setup" element={<LocaleSetupRedirect />} />
              </Route>
            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    // reducedMotion="user" makes every motion.* component honor the OS-level
    // prefers-reduced-motion setting automatically, rather than each usage
    // needing its own check.
    <MotionConfig reducedMotion="user">
      <ColorPaletteProvider>
        <Router>
          <AppContent />
        </Router>
      </ColorPaletteProvider>
    </MotionConfig>
  );
};

export default App;
