import React from 'react';
import DocumentationSection from '../../components/DocumentationSection';
import { useColorPalette } from '../../contexts/ColorPaletteContext';

const Introduction: React.FC = () => {
  const palette = useColorPalette();

  return (
    <DocumentationSection
      id="introduction"
      title="Introduction"
      description="Beamlynx uses pine-lang which is a powerful, intuitive query language that transpiles to SQL. Pine-lang uses a pipe-based syntax inspired by Unix pipes, making queries readable and composable. As you write queries, you see a real-time visualization of table relationships."
      syntax="table_name | operation_1: args | operation_2: args"
    >
      <p style={{ color: palette.secondary }}>
        💡 All examples are interactive. Click and experiment in the {' '}
        <a
          href="https://playground.beamlynx.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium underline hover:no-underline transition-all duration-200"
          style={{ color: palette.accent }}
        >
         playground
        </a>
      </p>
    </DocumentationSection>
  );
};

export default Introduction; 