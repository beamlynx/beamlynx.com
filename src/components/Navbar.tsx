import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useColorPalette } from '../contexts/ColorPaletteContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const location = useLocation();
  const palette = useColorPalette();
  const [showMobileMessage, setShowMobileMessage] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/docs', label: 'Documentation' },
    { path: '/posts', label: 'Posts' }
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const getCurrentPageTitle = () => {
    const currentItem = navItems.find(item => isActive(item.path));
    return currentItem?.label || '';
  };

  const handleTryItClick = (e: React.MouseEvent) => {
    if (window.innerWidth < 768) {
      e.preventDefault();
      setShowMobileMessage(true);
      setTimeout(() => setShowMobileMessage(false), 5000);
    }
  };

  const Logo = () => (
    <Link 
      to="/"
      className="group flex items-center space-x-2 sm:space-x-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-lg px-1 sm:px-2 py-1 -ml-1 sm:-ml-2"
      style={{ 
        color: palette.primary,
        '--tw-ring-color': palette.accent
      } as React.CSSProperties}
    >
      <svg 
        className="w-6 h-6 sm:w-7 sm:h-7 transition-transform group-hover:scale-110" 
        viewBox="0 0 32 32" 
        fill="none"
        style={{ color: palette.accent }}
      >
        <rect x="0" y="4" width="4" height="32" rx="1" fill="currentColor"/>
        <rect x="6" y="0" width="4" height="24" rx="1" fill="currentColor"/>
        <rect x="12" y="4" width="4" height="14" rx="1" fill="currentColor"/>
        <rect x="18" y="8" width="4" height="6" rx="1" fill="currentColor"/>
      </svg>
      <span className="text-lg sm:text-xl font-semibold tracking-tight font-mono hidden lg:inline">pine-lang</span>
    </Link>
  );

  const MobileMenu = () => {
    const [showMobileMessage, setShowMobileMessage] = useState(false);

    return (
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-[calc(var(--navbar-height)-0.5rem)] left-0 right-0 bg-white shadow-lg rounded-b-lg overflow-hidden"
            style={{ 
              backgroundColor: palette.background,
              borderBottom: `1px solid ${palette.accent}20`
            }}
          >
            <nav className="px-4 py-2 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block w-full px-3 py-2.5 rounded-lg text-[15px] font-medium transition-colors duration-200 ${
                    isActive(item.path) ? 'bg-black/5' : 'hover:bg-black/5'
                  }`}
                  style={{ 
                    color: isActive(item.path) ? palette.primary : palette.secondary
                  }}
                >
                  {item.label}
                </Link>
              ))}
              
              <div>
                <button
                  onClick={() => setShowMobileMessage(true)}
                  className="w-full px-3 py-2.5 rounded-lg text-[15px] font-medium bg-pine-600 text-white text-center transition-colors duration-200"
                >
                  Try It
                  <span className="inline-block ml-1">→</span>
                </button>

                <AnimatePresence>
                  {showMobileMessage && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 px-3 py-2 text-[13px] rounded-lg bg-black/5"
                      style={{ color: palette.secondary }}
                    >
                      Please visit from a desktop browser to try the playground.
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50">
      {/* Backdrop blur container */}
      <div 
        className="absolute inset-0 -z-10"
        style={{ 
          backgroundColor: `${palette.background}`,
          backdropFilter: 'blur(8px)',
          borderBottom: `1px solid ${palette.accent}20`
        }}
      />
      
      {/* Navbar content */}
      <nav 
        className="max-w-7xl mx-auto h-[var(--navbar-height)] px-4 sm:px-6 lg:px-8"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between h-full">
          {/* Left: Logo */}
          <div className="w-20">
            <Logo />
          </div>

          {/* Center: Current Page Title - Mobile Only */}
          <div 
            className="flex-1 md:hidden text-center"
          >
            <div className="relative inline-block">
              <h1 
                className="text-[14px] sm:text-[15px] font-medium tracking-wide truncate px-2"
                style={{ color: palette.primary }}
              >
                {getCurrentPageTitle()}
              </h1>
              <span 
                className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
                style={{ backgroundColor: palette.accent }}
              />
            </div>
          </div>

          {/* Right: Menu Button (Mobile) or Navigation (Desktop) */}
          <div className="w-20 flex justify-end">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg md:hidden hover:bg-black/5 transition-colors duration-200"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
              style={{ color: palette.secondary }}
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-0.5 sm:space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative px-2 sm:px-3 py-2 text-[14px] sm:text-[15px] font-medium tracking-wide transition-colors duration-200 rounded-lg hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  style={{ 
                    color: isActive(item.path) ? palette.primary : palette.secondary,
                    '--tw-ring-color': palette.accent
                  } as React.CSSProperties}
                >
                  {item.label}
                  {isActive(item.path) && (
                    <span 
                      className="absolute bottom-0 left-2 right-2 sm:left-3 sm:right-3 h-0.5 rounded-full"
                      style={{ backgroundColor: palette.accent }}
                    />
                  )}
                </Link>
              ))}
              
              {/* Try It Button */}
              <div className="relative">
                <a
                  href="https://try.pine-lang.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleTryItClick}
                  className="ml-1 sm:ml-4 px-2 sm:px-4 py-1.5 rounded-lg text-[14px] sm:text-[15px] font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 whitespace-nowrap flex items-center"
                  style={{ 
                    color: 'white',
                    backgroundColor: palette.accent,
                    '--tw-ring-color': palette.accent,
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
                  } as React.CSSProperties}
                >
                  Try It
                  <span className="inline-block ml-1 transition-transform group-hover:translate-x-0.5">→</span>
                </a>

                {/* Mobile Message Popup */}
                <AnimatePresence>
                  {showMobileMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 top-full mt-2 p-3 rounded-lg shadow-lg bg-white text-left w-64 text-sm"
                      style={{
                        border: `1px solid ${palette.accent}20`,
                        color: palette.primary
                      }}
                    >
                      The Pine Lang playground requires a desktop environment to run the local server. Please visit on a desktop browser to try it out.
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu />
    </header>
  );
};

export default Navbar; 