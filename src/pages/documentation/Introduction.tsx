import React from 'react';
import DocSection from './DocSection';
import { useColorPalette } from '../../contexts/ColorPaletteContext';

const Introduction: React.FC = () => {
  const palette = useColorPalette();

  return (
    <DocSection id="introduction" title="Introduction">
      <p>
        Beamlynx uses pine-lang which is a powerful, intuitive query language
        that transpiles to SQL. Pine-lang uses a pipe-based syntax inspired by
        Unix pipes, making queries readable and composable. As you write
        queries, you see a real-time visualization of table relationships.
      </p>

      <div 
        className="mt-6 p-4 rounded-lg border-l-4"
        style={{ 
          backgroundColor: `${palette.accent}08`,
          borderLeftColor: palette.accent 
        }}
      >
        <p className="text-sm" style={{ color: palette.secondary }}>
          <span className="font-medium" style={{ color: palette.primary }}>💡</span> 
          {' '}Throughout this documentation, you can click on any code example to open it directly in {' '}
          <a
            href="https://playground.beamlynx.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline hover:no-underline transition-all duration-200"
            style={{ color: palette.accent }}
          >
           interactive playground
          </a>
        </p>
      </div>
    </DocSection>
  );
};

export default Introduction; 