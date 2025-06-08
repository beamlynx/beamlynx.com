import React, { useEffect, useState, useCallback } from 'react';
import { useColorPalette } from '../contexts/ColorPaletteContext';
import { motion, AnimatePresence } from 'framer-motion';

const SECTIONS = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'basic-syntax', label: 'Basic Syntax' },
  { id: 'select', label: 'Select' },
  { id: 'where', label: 'Where' },
  { id: 'table', label: 'Table' },
  { id: 'join', label: 'Join' },
  { id: 'group', label: 'Group' },
  { id: 'limit', label: 'Limit' },
  { id: 'order', label: 'Order' },
  { id: 'count', label: 'Count' },
  { id: 'delete', label: 'Delete' },
  { id: 'from', label: 'From' }
] as const;

const Documentation: React.FC = () => {
  const palette = useColorPalette();
  const [activeSection, setActiveSection] = useState('introduction');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Simple scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset for navbar

      for (const section of SECTIONS) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle section link clicks
  const handleSectionClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      const sectionTop = section.offsetTop;
      
      window.scrollTo({
        top: sectionTop,
        behavior: 'smooth'
      });
      
      setActiveSection(sectionId);
      
      // Update URL without scrolling
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
              className="p-1 rounded-lg hover:bg-black/5"
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
                block py-2 px-3 rounded-md transition-all duration-200 
                text-[15px] leading-relaxed hover:bg-black/5
                ${activeSection === id ? 'bg-black/5 shadow-sm' : ''}
              `}
              style={{ 
                color: activeSection === id ? palette.primary : palette.secondary,
                ...(activeSection === id && {
                  transform: 'translateX(2px)',
                  fontWeight: 500
                })
              }}
            >
              {label}
            </a>
          ))}
        </nav>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-pine-50">
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

            <div className="prose prose-lg max-w-none">
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
              
              <section id="introduction" className="mb-16">
                <h2 
                  className="text-3xl font-semibold mb-6 tracking-tight"
                  style={{ color: palette.primary }}
                >
                  Introduction
                </h2>
                <p 
                  className="text-lg leading-relaxed mb-6"
                  style={{ color: palette.text }}
                >
                  Pine Lang is a powerful, intuitive query language that transpiles to SQL. It features a
                  pipe-based syntax inspired by Unix pipes, making queries readable and composable.
                  As you write queries, you see a real-time visualization of table relationships.
                </p>
              </section>

              <section id="basic-syntax" className="mb-16">
                <h2 
                  className="text-3xl font-semibold mb-6 tracking-tight"
                  style={{ color: palette.primary }}
                >
                  Basic Syntax
                </h2>
                <p 
                  className="text-lg leading-relaxed mb-6"
                  style={{ color: palette.text }}
                >
                  Pine Lang uses a pipe-based syntax (<code>|</code>) to chain operations. Each operation
                  transforms the query in some way. The basic format is:
                </p>
                <pre>
                  <code>table_name | operation1: args | operation2: args</code>
                </pre>
              </section>

              <section id="select" className="mb-16">
                <h2 className="text-3xl font-bold mb-6" style={{ color: palette.primary }}>
                  Select Operation
                </h2>
                <p className="text-lg leading-relaxed mb-4" style={{ color: palette.text }}>
                  The select operation (<code>select:</code> or <code>s:</code>) specifies which columns to return in the query result.
                </p>
                <pre>
                  <code>{`-- Select specific columns
company | select: id, name

-- Select with alias
company | s: id as company_id

-- Select with table qualification
company as c | employee as e | s: c.id, e.name

-- Select all columns from a table
company as c | s: c.*`}</code>
                </pre>
              </section>

              <section id="where" className="mb-16">
                <h2 className="text-3xl font-bold mb-6" style={{ color: palette.primary }}>
                  Where Operation
                </h2>
                <p className="text-lg leading-relaxed mb-4" style={{ color: palette.text }}>
                  The where operation (<code>where:</code> or <code>w:</code>) filters the results based on conditions.
                </p>
                <pre>
                  <code>{`-- Basic equality
company | where: name = 'Acme Inc.'

-- Multiple conditions
company | where: name like 'Acme%', country = 'US'

-- NULL checks
company | where: deleted_at is null

-- IN clause
company | where: country in ('US', 'UK', 'CA')

-- Column comparison
company | where: created_at = updated_at`}</code>
                </pre>
              </section>

              <section id="table" className="mb-16">
                <h2 className="text-3xl font-bold mb-6" style={{ color: palette.primary }}>
                  Table Operation
                </h2>
                <p className="text-lg leading-relaxed mb-4" style={{ color: palette.text }}>
                  Tables can be referenced directly or with schema qualification. They can also use aliases
                  and relationship indicators.
                </p>
                <pre>
                  <code>{`-- Basic table reference
users

-- Schema qualified
public.users

-- With alias
users as u

-- Child relationship
has: orders

-- Parent relationship
of: users
users^`}</code>
                </pre>
              </section>

              <section id="join" className="mb-16">
                <h2 className="text-3xl font-bold mb-6" style={{ color: palette.primary }}>
                  Join Operation
                </h2>
                <p className="text-lg leading-relaxed mb-4" style={{ color: palette.text }}>
                  Pine Lang automatically handles joins based on foreign key relationships.
                  Simply pipe tables together to create joins.
                </p>
                <pre>
                  <code>{`-- Basic join
company | employee

-- Multi-table join
company | employee | document

-- Join with schema qualification
x.company | y.employee | z.document

-- Join with context
company as c | employee | from: c | document`}</code>
                </pre>
              </section>

              <section id="group" className="mb-16">
                <h2 className="text-3xl font-bold mb-6" style={{ color: palette.primary }}>
                  Group Operation
                </h2>
                <p className="text-lg leading-relaxed mb-4" style={{ color: palette.text }}>
                  The group operation (<code>group:</code> or <code>g:</code>) groups results and performs aggregations.
                </p>
                <pre>
                  <code>{`-- Group by status and count
email | group: status => count

-- Multiple aggregations
orders | group: status => count, sum`}</code>
                </pre>
              </section>

              <section id="limit" className="mb-16">
                <h2 className="text-3xl font-bold mb-6" style={{ color: palette.primary }}>
                  Limit Operation
                </h2>
                <p className="text-lg leading-relaxed mb-4" style={{ color: palette.text }}>
                  The limit operation (<code>limit:</code> or <code>l:</code>) restricts the number of returned rows.
                </p>
                <pre>
                  <code>{`-- Limit to 10 rows
company | limit: 10

-- With other operations
company | where: country = 'US' | limit: 5`}</code>
                </pre>
              </section>

              <section id="order" className="mb-16">
                <h2 className="text-3xl font-bold mb-6" style={{ color: palette.primary }}>
                  Order Operation
                </h2>
                <p className="text-lg leading-relaxed mb-4" style={{ color: palette.text }}>
                  The order operation (<code>order:</code> or <code>o:</code>) sorts the results.
                </p>
                <pre>
                  <code>{`-- Basic ordering
company | order: name

-- Descending order
company | order: name desc

-- Multiple columns
company | order: country asc, name desc`}</code>
                </pre>
              </section>

              <section id="count" className="mb-16">
                <h2 className="text-3xl font-bold mb-6" style={{ color: palette.primary }}>
                  Count Operation
                </h2>
                <p className="text-lg leading-relaxed mb-4" style={{ color: palette.text }}>
                  The count operation (<code>count:</code>) returns the total number of rows.
                </p>
                <pre>
                  <code>{`-- Simple count
company | count:

-- Count with conditions
company | where: country = 'US' | count:`}</code>
                </pre>
              </section>

              <section id="delete" className="mb-16">
                <h2 className="text-3xl font-bold mb-6" style={{ color: palette.primary }}>
                  Delete Operation
                </h2>
                <p className="text-lg leading-relaxed mb-4" style={{ color: palette.text }}>
                  Pine Lang provides two delete operations:
                </p>
                <ul className="list-disc pl-6 mb-4" style={{ color: palette.text }}>
                  <li><code>delete:</code> or <code>d:</code> - Mark for deletion</li>
                  <li><code>delete!</code> or <code>d!</code> - Execute deletion</li>
                </ul>
                <pre>
                  <code>{`-- Mark for deletion
company | where: status = 'inactive' | delete:

-- Execute deletion
company | where: status = 'inactive' | delete! .id`}</code>
                </pre>
              </section>

              <section id="from" className="mb-16">
                <h2 className="text-3xl font-bold mb-6" style={{ color: palette.primary }}>
                  From Operation
                </h2>
                <p className="text-lg leading-relaxed mb-4" style={{ color: palette.text }}>
                  The from operation (<code>from:</code> or <code>f:</code>) sets the context for subsequent operations.
                </p>
                <pre>
                  <code>{`-- Set context for joins
company as c | employee | from: c | document

-- Multiple contexts
company as c | employee as e | from: c | document | from: e | attachment`}</code>
                </pre>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Documentation; 