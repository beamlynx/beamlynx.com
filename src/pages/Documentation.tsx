import React, { useEffect, useState, useCallback, Suspense, useRef } from 'react';
import { useColorPalette } from '../contexts/ColorPaletteContext';
import { motion, AnimatePresence } from 'framer-motion';
import documentationComponents from './documentation';
import LoadingIndicator from '../components/LoadingIndicator';

const SECTIONS = Object.keys(documentationComponents).map(key => {
  const id = key
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/^-/, '');
  const label = key.replace(/([A-Z])/g, ' $1').trim();
  return {
    id,
    label,
    component: documentationComponents[key as keyof typeof documentationComponents]
  };
});

const Documentation: React.FC = () => {
  const palette = useColorPalette();
  const [activeSection, setActiveSection] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollObserverRef = useRef<IntersectionObserver | null>(null);
  const scrollTimeoutRef = useRef<number | null>(null);
  const activeSectionRef = useRef(activeSection);
  const isScrollingRef = useRef(isScrolling);

  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  useEffect(() => {
    isScrollingRef.current = isScrolling;
  }, [isScrolling]);

  // Initial setup effect - handles hash navigation and initial active section
  useEffect(() => {
    const targetId = window.location.hash.substring(1) || SECTIONS[0]?.id;
    if (!targetId) return;

    const observer = new MutationObserver(() => {
      const element = document.getElementById(targetId);
      if (element) {
        if (window.location.hash) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
        setActiveSection(targetId);
        observer.disconnect();
      }
    });

    if (contentRef.current) {
        observer.observe(contentRef.current, {
            childList: true,
            subtree: true,
        });
    }

    // Fallback check in case the content is already in the DOM
    const element = document.getElementById(targetId);
    if (element) {
        if (window.location.hash) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setActiveSection(targetId);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const commitMostVisibleRef = useRef<() => void>(() => {});

  // Scroll tracking effect - sets up persistent IntersectionObserver for all sections
  useEffect(() => {
    // Position-based scrollspy: pick the last section (in document order) whose
    // top has crossed into the top ~40% of the viewport. We deliberately don't use
    // intersectionRatio here - it's relative to each section's own height, so a
    // long section (like Variables, with many examples) barely peeking into view
    // reports a tiny ratio and loses out to a short section just above it that's
    // almost entirely scrolled past. Position doesn't have that bias.
    const commitMostVisible = () => {
      const triggerLine = window.innerHeight * 0.4;
      let candidateId: string | null = null;

      for (const { id } of SECTIONS) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= triggerLine) {
          candidateId = id;
        }
      }

      // Above the first section (e.g. page just loaded, not yet scrolled), default to it.
      if (!candidateId) {
        candidateId = SECTIONS[0]?.id ?? null;
      }

      if (candidateId && candidateId !== activeSectionRef.current) {
        setActiveSection(candidateId);
        // Update URL hash without scrolling
        if (window.location.hash !== `#${candidateId}`) {
          window.history.replaceState(null, '', `#${candidateId}`);
        }
      }
    };
    commitMostVisibleRef.current = commitMostVisible;

    const setupScrollObserver = () => {
      // Clean up existing observer
      if (scrollObserverRef.current) {
        scrollObserverRef.current.disconnect();
      }

      const sectionElements = SECTIONS.map(({ id }) => document.getElementById(id)).filter(Boolean);

      if (sectionElements.length === 0) {
        // Sections not ready yet, try again after a delay
        setTimeout(setupScrollObserver, 100);
        return;
      }

      // The observer is just a cheap "something moved, please recheck" trigger -
      // the actual section choice is (re)computed live in commitMostVisible above.
      scrollObserverRef.current = new IntersectionObserver(
        () => {
          // While the page is actively scrolling (including our own smooth-scroll
          // from a sidebar click), positions are mid-flight - defer to the
          // settle-triggered commit instead (see the scroll detection effect below).
          if (isScrollingRef.current) return;

          commitMostVisible();
        },
        {
          // Adjust rootMargin to account for navbar and give some buffer
          rootMargin: '-100px 0px -60% 0px',
          threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5]
        }
      );

      // Observe all section elements
      sectionElements.forEach(element => {
        if (element) {
          scrollObserverRef.current!.observe(element);
        }
      });
    };

    // Set up the observer after content is loaded
    if (contentRef.current) {
      const mutationObserver = new MutationObserver(() => {
        setupScrollObserver();
      });

      mutationObserver.observe(contentRef.current, {
        childList: true,
        subtree: true,
      });

      // Also try to set up immediately in case content is already loaded
      setupScrollObserver();

      return () => {
        mutationObserver.disconnect();
        if (scrollObserverRef.current) {
          scrollObserverRef.current.disconnect();
        }
      };
    }
  }, []);

  // Scroll detection effect - tracks when user is scrolling to disable hover effects
  // and to gate live selection updates while mid-flight (see scroll tracking effect).
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Set a timeout to detect when scrolling has stopped
      scrollTimeoutRef.current = window.setTimeout(() => {
        setIsScrolling(false);
        // Force one authoritative recheck against the latest known intersection
        // data - the observer may have already delivered the settled state while
        // still marked as scrolling, and nothing will otherwise re-trigger it now
        // that the page has actually stopped moving.
        commitMostVisibleRef.current();
      }, 150); // 150ms after scrolling stops
    };

    // Listen for scroll events on the main content area
    const mainElement = document.querySelector('main');
    if (mainElement) {
      mainElement.addEventListener('scroll', handleScroll, { passive: true });
    }

    // Also listen on window in case scrolling happens on the window
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (mainElement) {
        mainElement.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('scroll', handleScroll);

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Handle section link clicks
  const handleSectionClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);

    if (section) {
      // Mark as scrolling immediately so the IntersectionObserver ignores the
      // mid-flight ratios of the smooth scroll and doesn't fight this selection.
      // The real scroll-end detection below (driven by actual scroll events)
      // clears this once the animation settles, however long it takes.
      setIsScrolling(true);

      // Immediately update active section
      setActiveSection(sectionId);

      section.scrollIntoView({
        behavior: 'smooth'
      });
      window.history.pushState(null, '', `#${sectionId}`);
    }
  }, []);

  const MobileHeader = () => (
    <div 
      className="fixed top-[var(--navbar-height)] left-0 right-0 z-40 md:hidden"
      style={{
        backgroundColor: palette.background,
        backdropFilter: 'blur(8px)',
        borderBottom: `1px solid ${palette.accent}20`
      }}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <h1 className="text-lg font-semibold" style={{ color: palette.primary }}>
          {SECTIONS.find(s => s.id === activeSection)?.label}
        </h1>
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="flex items-center px-3 py-1.5 rounded-lg transition-colors duration-200"
          style={{ 
            backgroundColor: `${palette.accent}10`,
            color: palette.accent
          }}
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );

  const Sidebar = ({ isMobile = false }) => (
    <div 
      className={`${
        isMobile 
          ? 'fixed inset-0 bg-black/50 z-50 flex items-start justify-end'
          : 'fixed left-0 top-[var(--navbar-height)] bottom-0 w-72 z-40 hidden md:block'
      }`}
      onClick={isMobile ? () => setIsMobileMenuOpen(false) : undefined}
    >
      <motion.div
        initial={isMobile ? { x: 300 } : undefined}
        animate={isMobile ? { x: 0 } : undefined}
        exit={isMobile ? { x: 300 } : undefined}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className={`${
          isMobile 
            ? 'w-[85%] max-w-sm h-full overflow-auto'
            : 'h-full w-full overflow-y-auto'
        }`}
        style={{ 
          backgroundColor: isMobile ? palette.background : `${palette.background}aa`,
          backdropFilter: 'blur(8px)',
          borderLeft: isMobile ? `1px solid ${palette.accent}20` : 'none',
          borderRight: isMobile ? 'none' : `1px solid ${palette.accent}20`,
        }}
        onClick={isMobile ? e => e.stopPropagation() : undefined}
      >
        {isMobile && (
          <div 
            className="sticky top-0 flex items-center justify-between p-4 border-b"
            style={{ borderColor: `${palette.accent}20` }}
          >
            <h2 className="text-lg font-semibold" style={{ color: palette.primary }}>
              Navigation
            </h2>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1 rounded-lg hover:bg-white/5"
              style={{ color: palette.secondary }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        <nav className="p-4 space-y-0.5">
          {SECTIONS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => {
                handleSectionClick(e, id);
                if (isMobile) setIsMobileMenuOpen(false);
              }}
              className={`
                flex items-center justify-between gap-2 py-2 px-3 rounded-md transition-all duration-200
                text-[15px] leading-relaxed
                ${!isScrolling ? 'hover:bg-white/5' : ''}
                ${activeSection === id ? 'bg-white/10 shadow-sm' : ''}
              `}
              style={{
                color: activeSection === id ? palette.primary : palette.secondary,
                ...(activeSection === id && {
                  transform: 'translateX(2px)',
                  fontWeight: 500
                })
              }}
            >
              <span>{label}</span>
            </a>
          ))}
        </nav>
      </motion.div>
    </div>
  );

  const activeLabel = SECTIONS.find(s => s.id === activeSection)?.label || 'Docs';

  return (
    <div className="bp-page min-h-screen">
      <title>beamlynx - {activeLabel}</title>
      <meta
        name="description"
        content="Explore the official Beamlynx documentation. Learn the syntax, features, and best practices for using pine-lang to write clear and efficient database queries."
      />
              <meta property="og:title" content="Beamlynx - pine-lang" />
        <meta property="og:description" content="Explore the official pine-lang documentation and learn how to write clear, efficient database queries." />
      <meta property="og:type" content="article" />
      <meta property="og:url" content="https://beamlynx.org/docs" />
      <meta property="og:image" content="https://beamlynx.org/pine-social-preview.svg" />
      <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:title" content="Beamlynx - pine-lang" />
      <meta name="twitter:description" content="Explore the official pine-lang documentation and learn how to write clear, efficient database queries." />
      <meta name="twitter:image" content="https://beamlynx.org/pine-social-preview.svg" />
      {/* Mobile Header */}
      <MobileHeader />

      {/* Sidebar for desktop */}
      <Sidebar />

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && <Sidebar isMobile />}
      </AnimatePresence>

      {/* Main Content */}
      <main className="pt-[calc(var(--navbar-height)+4rem)] md:pt-0 md:pl-72">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div>
            <div className="max-w-none" ref={contentRef}>
              <style>
                {`
                  section[id] {
                    scroll-margin-top: 100px;
                  }
                  section[id] h2 {
                    scroll-margin-top: 100px;
                  }
                  /* Style inline code blocks */
                  code:not(pre code) {
                    background-color: ${palette.accent}10;
                    color: ${palette.accent};
                    padding: 0.2em 0.4em;
                    border-radius: 0.25em;
                    font-size: 0.875em;
                    font-weight: 500;
                    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
                    white-space: nowrap;
                  }
                  /* Remove any pseudo-elements that might be adding backticks */
                  code:not(pre code)::before,
                  code:not(pre code)::after {
                    content: none !important;
                  }
                  /* Style code blocks within pre tags */
                  pre {
                    background-color: ${palette.accent}10;
                    border-radius: 0.5em;
                    padding: 1em;
                    margin: 1em 0;
                    overflow-x: auto;
                  }
                  pre code {
                    color: ${palette.primary};
                    padding: 0;
                    background: none;
                    font-size: 0.875em;
                    line-height: 1.7;
                  }
                  pre code::before,
                  pre code::after {
                    content: none !important;
                  }
                `}
              </style>
              
              <Suspense fallback={<LoadingIndicator text="Loading docs..." />}>
                {SECTIONS.map(({ id, component: Component }) => (
                  <Component key={id} />
                ))}
              </Suspense>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Documentation; 