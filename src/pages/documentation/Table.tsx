import React from 'react';
import DocSection from './DocSection';
import { useColorPalette } from '../../contexts/ColorPaletteContext';

const Table: React.FC = () => {
  const palette = useColorPalette();

  const examples = [
    {
      title: 'Basic table reference',
      query: 'customers',
      description: 'Reference a table directly by its name'
    },
    {
      title: 'Schema qualified',
      query: 'public.customers',
      description: 'Specify the schema for clarity and avoid naming conflicts'
    },
    {
      title: 'With alias',
      query: 'customers as c',
      description: 'Use aliases to create shorter references for complex queries'
    }
  ];

  const handleExampleClick = (query: string) => {
    const url = `https://playground.beamlynx.com?query=${encodeURIComponent(query)}`;
    window.open(url, '_blank');
  };

  return (
    <DocSection id="table" title="Table Operation">
      <p>
        Tables can be referenced directly or with schema qualification. They can also use aliases
        and relationship indicators. Click any example below to try it in the interactive playground.
      </p>
      
      <div className="space-y-6 mt-8">
        {examples.map((example, index) => (
          <div key={index} className="group">
            <h4 className="text-lg font-semibold mb-2" style={{ color: palette.primary }}>
              {example.title}
            </h4>
            
            <p className="text-sm mb-3" style={{ color: palette.secondary }}>
              {example.description}
            </p>
            
            <div className="relative">
              <pre 
                className="cursor-pointer transition-all duration-200 hover:ring-2 hover:ring-opacity-50 hover:shadow-lg pr-20"
                style={{ 
                  '--tw-ring-color': palette.accent,
                } as React.CSSProperties}
                onClick={() => handleExampleClick(example.query)}
                title="Try in playground"
              >
                <code>{example.query}</code>
              </pre>
              
              <button
                onClick={() => handleExampleClick(example.query)}
                className="absolute top-3 right-3 inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 opacity-70 group-hover:opacity-100 hover:scale-105 hover:shadow-sm"
                style={{ 
                  backgroundColor: `${palette.accent}20`,
                  color: palette.accent 
                }}
                title="Try in playground"
              >
                <span>Try it</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </DocSection>
  );
};

export default Table; 