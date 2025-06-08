import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useColorPalette } from '../contexts/ColorPaletteContext';

const Navbar: React.FC = () => {
  const location = useLocation();
  const palette = useColorPalette();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/docs', label: 'Documentation' }
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50">
      {/* Backdrop blur container */}
      <div 
        className="absolute inset-0 -z-10"
        style={{ 
          backgroundColor: `${palette.background}dd`,
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
          {/* Logo */}
          <Link 
            to="/"
            className="group flex items-center space-x-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-lg px-2 py-1 -ml-2"
            style={{ 
              color: palette.primary,
              '--tw-ring-color': palette.accent
            } as React.CSSProperties}
          >
            <svg 
              className="w-7 h-7 transition-transform group-hover:scale-110" 
              viewBox="0 0 32 32" 
              fill="none"
              style={{ color: palette.accent }}
            >
              <rect x="0" y="4" width="4" height="32" rx="1" fill="currentColor"/>
              <rect x="6" y="0" width="4" height="24" rx="1" fill="currentColor"/>
              <rect x="12" y="4" width="4" height="14" rx="1" fill="currentColor"/>
              <rect x="18" y="8" width="4" height="4" rx="1" fill="currentColor"/>
            </svg>
            <span className="text-xl font-semibold tracking-tight font-mono">pine-lang</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="relative px-3 py-2 text-[15px] font-medium tracking-wide transition-colors duration-200 rounded-lg hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{ 
                  color: isActive(item.path) ? palette.primary : palette.secondary,
                  '--tw-ring-color': palette.accent
                } as React.CSSProperties}
              >
                {item.label}
                {isActive(item.path) && (
                  <span 
                    className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full"
                    style={{ backgroundColor: palette.accent }}
                  />
                )}
              </Link>
            ))}
            
            {/* Try It Button */}
            <a
              href="https://try.pine-lang.org"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 px-4 py-1.5 rounded-lg text-[15px] font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
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
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar; 