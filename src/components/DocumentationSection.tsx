import React from "react";
import DocSection from "../pages/documentation/DocSection";
import { useColorPalette } from "../contexts/ColorPaletteContext";
import { openInPlayground } from "../utils/playground";

export interface DocumentationExample {
  title: string;
  expression: string;
  sql?: string;
  description?: string;
}

// Function to format SQL with proper line breaks and indentation
const formatSQL = (sql: string): string => {
  return sql
    // Normalize keywords to uppercase
    .replace(/\bSELECT\b/gi, 'SELECT')
    .replace(/\bFROM\b/gi, '\nFROM')
    .replace(/\bWHERE\b/gi, '\nWHERE')
    .replace(/\bAND\b/gi, '\n  AND')
    .replace(/\bOR\b/gi, '\n  OR')
    // Handle different types of JOINs
    .replace(/\bLEFT\s+JOIN\b/gi, '\nLEFT JOIN')
    .replace(/\bRIGHT\s+JOIN\b/gi, '\nRIGHT JOIN')
    .replace(/\bINNER\s+JOIN\b/gi, '\nINNER JOIN')
    .replace(/\bFULL\s+OUTER\s+JOIN\b/gi, '\nFULL OUTER JOIN')
    .replace(/\bJOIN\b/gi, '\nJOIN')
    .replace(/\bON\b/gi, '\n  ON')
    // Other clauses
    .replace(/\bORDER\s+BY\b/gi, '\nORDER BY')
    .replace(/\bGROUP\s+BY\b/gi, '\nGROUP BY')
    .replace(/\bHAVING\b/gi, '\nHAVING')
    .replace(/\bLIMIT\b/gi, '\nLIMIT')
    .replace(/\bOFFSET\b/gi, '\nOFFSET')
    // Handle subqueries and CASE statements
    .replace(/\bCASE\b/gi, '\nCASE')
    .replace(/\bWHEN\b/gi, '\n  WHEN')
    .replace(/\bTHEN\b/gi, ' THEN')
    .replace(/\bELSE\b/gi, '\n  ELSE')
    .replace(/\bEND\b/gi, '\nEND')
    // Clean up extra whitespace and trim
    .replace(/\n\s*\n/g, '\n')
    .trim();
};

// SQL syntax highlighter component that returns React elements
const HighlightedSQL: React.FC<{ sql: string }> = ({ sql }) => {
  const keywords = ['SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'FULL', 'OUTER', 'ON', 'ORDER', 'BY', 'GROUP', 'HAVING', 'LIMIT', 'OFFSET', 'AS', 'IS', 'NULL', 'NOT', 'LIKE', 'IN', 'BETWEEN', 'EXISTS', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'ASC', 'DESC'];
  
  // Split by whitespace and punctuation while preserving them
  const parts = sql.split(/(\s+|[().,;=<>!])/);
  
  return (
    <>
      {parts.map((part, index) => {
        const trimmedPart = part.trim().toUpperCase();
        
        // Skip empty parts
        if (!part) return null;
        
        // Check if it's a keyword
        if (keywords.includes(trimmedPart)) {
          return (
            <span key={index} style={{ color: '#1e40af', fontWeight: 700 }}>
              {part}
            </span>
          );
        }
        
        // Check if it's a string (starts and ends with quotes)
        if (part.match(/^'.*'$/)) {
          return (
            <span key={index} style={{ color: '#059669', fontWeight: 600 }}>
              {part}
            </span>
          );
        }
        
        // Check if it's a number
        if (part.match(/^\d+$/)) {
          return (
            <span key={index} style={{ color: '#7c2d92', fontWeight: 600 }}>
              {part}
            </span>
          );
        }
        
        // Check if it's an operator
        if (part.match(/^[=<>!]+$/)) {
          return (
            <span key={index} style={{ color: '#374151', fontWeight: 700 }}>
              {part}
            </span>
          );
        }
        
        // Default styling for other text (including punctuation and whitespace)
        return (
          <span key={index} style={{ color: '#1e293b' }}>
            {part}
          </span>
        );
      })}
    </>
  );
};

interface DocumentationSectionProps {
  id: string;
  title: string;
  description: string;
  examples?: DocumentationExample[];
  operations?: string[];
  syntax?: string;
  children?: React.ReactNode;
  isOperation?: boolean;
}

const DocumentationSection: React.FC<DocumentationSectionProps> = ({
  id,
  title,
  description,
  examples = [],
  operations = [],
  syntax,
  children,
  isOperation = false,
}) => {
  const palette = useColorPalette();



  return (
    <DocSection id={id} title={title} isOperation={isOperation}>
      {/* Operations badges with improved design */}
      {operations.length > 0 && (
        <div className="mb-8 -mt-2">
          <div className="flex flex-wrap items-center gap-3">
            {operations.map((operation, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1.5 text-sm font-mono font-semibold rounded-full shadow-sm ring-1 ring-inset transition-all duration-200 hover:shadow-md"
                style={{
                  backgroundColor: `${palette.accent}08`,
                  color: palette.accent,
                  borderColor: `${palette.accent}25`,
                }}
              >
                {operation}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Description with improved typography */}
      <div className="mb-8">
        <p className="text-lg leading-relaxed" style={{ color: palette.secondary }}>
          {description}
        </p>
      </div>

      {/* Syntax block with elegant design */}
      {syntax && (
        <div className="mb-10">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-gray-100 to-transparent rounded-xl opacity-50"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <h3 
                  className="text-sm font-semibold tracking-wide uppercase"
                  style={{ color: palette.primary }}
                >
                  Syntax
                </h3>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-red-400"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                </div>
              </div>
              <pre
                className="p-6 rounded-xl border shadow-sm font-mono text-sm leading-relaxed overflow-x-auto"
                style={{
                  backgroundColor: `${palette.primary}05`,
                  borderColor: `${palette.secondary}15`,
                  color: palette.primary,
                }}
              >
                <code className="font-medium">{syntax}</code>
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Custom children content */}
      {children && (
        <div className="mb-10 prose prose-lg max-w-none">
          {children}
        </div>
      )}

      {/* Examples with enhanced design */}
      {examples.length > 0 && (
        <div className="space-y-8">
          <div className="border-t pt-8" style={{ borderColor: `${palette.secondary}15` }}>
            <h3 
              className="text-xl font-semibold mb-6 flex items-center gap-2"
              style={{ color: palette.primary }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Examples
            </h3>
          </div>

          <div className="grid gap-6">
            {examples.map((example, index) => (
              <div 
                key={index} 
                className="group relative bg-white rounded-xl border shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                style={{ borderColor: `${palette.secondary}10` }}
              >
                {/* Example header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 
                        className="text-lg font-semibold mb-2"
                        style={{ color: palette.primary }}
                      >
                        {example.title}
                      </h4>
                      <p 
                        className="text-sm leading-relaxed"
                        style={{ color: palette.secondary }}
                      >
                        {example.description || ''}
                      </p>
                    </div>
                    
                    {/* Try it button */}
                    <button
                      onClick={() => openInPlayground(example.expression)}
                      className="ml-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                      style={{
                        backgroundColor: `${palette.accent}10`,
                        color: palette.accent,
                      }}
                      title="Try in playground"
                    >
                      <span>Try it</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Code block */}
                <div className="px-6 pb-6 space-y-4">
                  <div 
                    className="relative cursor-pointer rounded-lg border transition-all duration-300 hover:ring-2 hover:ring-opacity-30 hover:shadow-md"
                    style={{ 
                      borderColor: `${palette.secondary}15`,
                      '--tw-ring-color': palette.accent,
                    } as React.CSSProperties}
                    onClick={() => openInPlayground(example.expression)}
                  >
                    {/* Pine expression - highlighted */}
                    <pre className="p-4 m-0 rounded-lg overflow-x-auto border-2 shadow-md" 
                         style={{ 
                           backgroundColor: `${palette.accent}15`,
                           borderColor: `${palette.accent}40`,
                           whiteSpace: 'pre-wrap'
                         }}>
                      <code 
                        className="text-sm font-mono font-semibold"
                        style={{ color: palette.primary }}
                      >
                        {example.expression.split('|').join('\n|')}
                      </code>
                    </pre>
                    
                    {/* Hover overlay */}
                    <div 
                      className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-5 transition-opacity duration-200"
                      style={{ backgroundColor: palette.accent }}
                    ></div>
                  </div>

                  {/* SQL code block */}
                  {example.sql && (
                    <>
                      <div className="flex items-center justify-center py-2">
                        <div className="text-sm font-medium" style={{ color: palette.secondary }}>
                          becomes
                        </div>
                      </div>
                      <div 
                        className="documentation-sql-block rounded-lg border"
                        style={{ borderColor: `${palette.secondary}15` }}
                      >
                        <pre className="p-4 m-0 rounded-lg overflow-x-auto">
                          <code 
                            className="text-sm font-mono font-normal"
                            style={{ 
                              whiteSpace: 'pre-line',
                              color: '#1e293b',
                              lineHeight: '1.6'
                            }}
                          >
                            <HighlightedSQL sql={formatSQL(example.sql)} />
                          </code>
                        </pre>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </DocSection>
  );
};

export default DocumentationSection; 