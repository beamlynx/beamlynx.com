import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Documentation from './pages/Documentation';
import { ColorPaletteProvider } from './contexts/ColorPaletteContext';
import Navbar from './components/Navbar';
import { AnimatePresence } from 'framer-motion';
import Footer from './components/Footer';
import { useEffect, lazy, Suspense } from 'react';
import LoadingIndicator from './components/LoadingIndicator';

const Home = lazy(() => import('./pages/Home'));
const Posts = lazy(() => import('./pages/Posts'));
const Setup = lazy(() => import('./pages/Setup'));

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
      case '/setup':
        document.title = 'Beamlynx - Getting Started';
        break;
      default:
        document.title = 'Beamlynx';
    }
    
    window.scrollTo(0, 0);
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
              <Route path="/setup" element={<Setup />} />
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
    <ColorPaletteProvider>
      <Router>
        <AppContent />
      </Router>
    </ColorPaletteProvider>
  );
};

export default App;
