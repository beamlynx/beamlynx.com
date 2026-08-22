import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Documentation from './pages/Documentation';
import { ColorPaletteProvider } from './contexts/ColorPaletteContext';
import Navbar from './components/Navbar';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import Footer from './components/Footer';
import NewsletterPopup from './components/NewsletterPopup';
import { useEffect, lazy, Suspense } from 'react';
import LoadingIndicator from './components/LoadingIndicator';
import { trackPageview } from './utils/analytics';

const Home = lazy(() => import('./pages/Home'));
const Posts = lazy(() => import('./pages/Posts'));
const Download = lazy(() => import('./pages/Download'));

// Scroll to top on route change
function ScrollToTop() {
  const location = useLocation();
  
  useEffect(() => {
    // Update document title based on the path
    switch (location.pathname) {
      case '/':
        document.title = 'Beamlynx - Visual & Intuitive Database Queries';
        break;
      case '/docs':
        document.title = 'Beamlynx - pine-lang';
        break;
      case '/posts':
        document.title = 'Beamlynx - Blog';
        break;
      case '/download':
        document.title = 'Beamlynx - Download';
        break;
      default:
        document.title = 'Beamlynx';
    }
    
    window.scrollTo(0, 0);
    trackPageview(location.pathname);
  }, [location.pathname]);
  
  return null;
}

const AppContent = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />
      <ScrollToTop />
      <main className="flex-1 relative">
        <AnimatePresence mode="wait">
          <Suspense fallback={<LoadingIndicator className="h-screen" text="Loading page..." />}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/docs" element={<Documentation />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/download" element={<Download />} />
              {/* Old URL from before the "Getting Started" -> "Download" rename */}
              <Route path="/setup" element={<Navigate to="/download" replace />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>
      <Footer />
      <NewsletterPopup />
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
