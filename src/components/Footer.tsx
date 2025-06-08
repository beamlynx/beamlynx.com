import React from 'react';
import { useColorPalette } from '../contexts/ColorPaletteContext';

const Footer: React.FC = () => {
  const palette = useColorPalette();

  return (
    <footer 
      className="fixed bottom-0 left-0 right-0 w-full py-4 z-40"
      style={{ 
        borderTop: `1px solid ${palette.accent}20`,
        backgroundColor: `${palette.background}dd`,
        backdropFilter: 'blur(8px)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <div 
            className="text-sm font-medium tracking-wide"
            style={{ color: palette.secondary }}
          >
            Built with ♥ in Denmark
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 