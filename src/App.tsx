import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Documentation from './pages/Documentation';
import { ColorPaletteProvider } from './contexts/ColorPaletteContext';
import Navbar from './components/Navbar';
import { AnimatePresence } from 'framer-motion';
import Footer from './components/Footer';
import { useEffect, lazy, Suspense } from 'react';

const Home = lazy(() => import('./pages/Home'));

// Scroll to top on route change
function ScrollToTop() {
  const location = useLocation();
  
  useEffect(() => {
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
          <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/docs" element={<Documentation />} />
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
