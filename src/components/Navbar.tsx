import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useColorPalette } from "../contexts/ColorPaletteContext";
import { motion, AnimatePresence } from "framer-motion";
import { trackEvent } from "../utils/analytics";
import { getLangFromPathname, localizedPath, stripLocalePrefix } from "../i18n/paths";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar: React.FC = () => {
  const location = useLocation();
  const palette = useColorPalette();
  const { t } = useTranslation("common");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const lang = getLangFromPathname(location.pathname);
  const currentBasePath = stripLocalePrefix(location.pathname, lang);
  const withLocale = (basePath: string) => localizedPath(lang ?? "en", basePath);
  // The homepage's live demo - the hosted playground this used to open is shut down.
  const tryItHref = { pathname: withLocale("/"), hash: "#try" };

  const navItems = [
    {
      path: "/",
      label: t("nav.home"),
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      path: "/features",
      label: t("nav.features"),
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h10M4 18h6" />
        </svg>
      )
    },
    {
      path: "/docs",
      label: t("nav.dsl"),
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    {
      path: "/download",
      label: t("nav.download"),
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
        </svg>
      )
    },
    {
      path: "/posts",
      label: t("nav.posts"),
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      )
    },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return currentBasePath === path;
    }
    return currentBasePath.startsWith(path);
  };

  const getCurrentPageTitle = () => {
    const currentItem = navItems.find((item) => isActive(item.path));
    return currentItem?.label || "";
  };

  const Logo = () => (
    <Link
      to={withLocale("/")}
      className="group flex items-center space-x-2 sm:space-x-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-lg px-1 sm:px-2 py-1 -ml-1 sm:-ml-2"
      style={
        {
          color: palette.primary,
          "--tw-ring-color": palette.accent,
        } as React.CSSProperties
      }
    >
      <svg
        className="w-6 h-6 sm:w-7 sm:h-7 transition-transform group-hover:scale-110"
        viewBox="0 0 32 32"
        fill="none"
        style={{ color: palette.accent }}
      >
        <rect x="0" y="4" width="4" height="32" rx="1" fill="currentColor" />
        <rect x="6" y="0" width="4" height="24" rx="1" fill="currentColor" />
        <rect x="12" y="4" width="4" height="14" rx="1" fill="currentColor" />
        <rect x="18" y="8" width="4" height="6" rx="1" fill="currentColor" />
      </svg>
      <span className="text-lg sm:text-xl font-semibold tracking-tight hidden lg:inline whitespace-nowrap">
        Beamlynx
      </span>
    </Link>
  );

  const MobileMenu = () => {
    return (
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-[calc(var(--navbar-height)-0.5rem)] left-0 right-0 overflow-hidden"
            style={{
              backgroundColor: palette.background,
              borderBottom: `1px solid ${palette.accent}20`,
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.35)",
            }}
          >
            <nav className="px-4 py-2 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={withLocale(item.path)}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block w-full px-3 py-2.5 rounded-lg text-[15px] font-medium transition-colors duration-200 ${
                    isActive(item.path) ? "bg-white/10" : "hover:bg-white/5"
                  }`}
                  style={{
                    color: isActive(item.path)
                      ? palette.primary
                      : palette.secondary,
                  }}
                >
                  <span className="flex items-center gap-2">
                    {item.icon}
                    <span>{item.label}</span>
                  </span>
                </Link>
              ))}

              <div>
                <Link
                  to={tryItHref}
                  onClick={() => {
                    trackEvent('nav_try_it_clicked', { source: 'navbar_mobile_menu' });
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full px-3 py-2.5 rounded-lg text-[15px] font-medium text-center transition-colors duration-200"
                  style={{
                    color: "#1a1b26",
                    backgroundColor: palette.accent,
                    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                  }}
                >
                  {t("nav.tryIt")}
                </Link>
              </div>

              <LanguageSwitcher variant="mobile" onNavigate={() => setIsMobileMenuOpen(false)} />
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
          backdropFilter: "blur(8px)",
          borderBottom: `1px solid ${palette.accent}20`,
        }}
      />

      {/* Navbar content */}
      <nav
        className="max-w-7xl mx-auto h-[var(--navbar-height)] px-4 sm:px-6 lg:px-8"
        role="navigation"
        aria-label={t("nav.mainNavigation")}
      >
        <div className="flex items-center justify-between h-full">
          {/* Left: Logo */}
          <div className="w-32 lg:w-48">
            <Logo />
          </div>

          {/* Center: Current Page Title - Mobile Only */}
          <div className="flex-1 lg:hidden text-center">
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

          {/* Right: Menu Button (Mobile) or Navigation (Desktop). Fixed width
              only applies below `lg` (sized for the hamburger button) --
              past `lg` it must hug the full nav's content width instead of
              lying about an 80px box, or the nav creeps left into the logo
              at exactly the switch-over breakpoint (see git history for the
              overlap bug this caused once translated labels made the nav
              wider than English). */}
          <div className="w-20 lg:w-auto flex justify-end">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg lg:hidden hover:bg-white/5 transition-colors duration-200"
              aria-label={t("nav.toggleMenu")}
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
            <div className="hidden lg:flex items-center space-x-0.5 sm:space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={withLocale(item.path)}
                  className="relative px-2 sm:px-3 py-2 text-[14px] sm:text-[15px] font-medium tracking-wide transition-colors duration-200 rounded-lg hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 whitespace-nowrap"
                  style={
                    {
                      color: isActive(item.path)
                        ? palette.primary
                        : palette.secondary,
                      "--tw-ring-color": palette.accent,
                    } as React.CSSProperties
                  }
                >
                  <span className="flex items-center gap-1.5">
                    {item.icon}
                    <span>{item.label}</span>
                  </span>
                  {isActive(item.path) && (
                    <span
                      className="absolute bottom-0 left-2 right-2 sm:left-3 sm:right-3 h-0.5 rounded-full"
                      style={{ backgroundColor: palette.accent }}
                    />
                  )}
                </Link>
              ))}

              {/* Try it: links to the homepage demo */}
              <div className="relative">
                <Link
                  to={tryItHref}
                  onClick={() => trackEvent('nav_try_it_clicked', { source: 'navbar_desktop' })}
                  className="ml-1 sm:ml-4 px-2 sm:px-4 py-1.5 rounded-lg text-[14px] sm:text-[15px] font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 whitespace-nowrap flex items-center"
                  style={
                    {
                      // Dark text on the accent, not white - the accent is too
                      // light for white text (matches the app's --canvas-accent-text).
                      color: "#1a1b26",
                      backgroundColor: palette.accent,
                      "--tw-ring-color": palette.accent,
                      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                    } as React.CSSProperties
                  }
                >
                  {t("nav.tryIt")}
                </Link>
              </div>

              <LanguageSwitcher variant="desktop" />
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
