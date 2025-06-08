import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type ColorPalette = {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
};

const palettes: ColorPalette[] = [
  {
    id: 'nordic-minimal',
    name: 'Nordic Minimal',
    colors: {
      primary: '#2E3440',
      secondary: '#4C566A',
      accent: '#5E81AC',
      background: '#ECEFF4',
      text: '#2E3440'
    }
  },
  {
    id: 'fjord-blue',
    name: 'Fjord Blue',
    colors: {
      primary: '#5E81AC',
      secondary: '#81A1C1',
      accent: '#88C0D0',
      background: '#ECEFF4',
      text: '#2E3440'
    }
  },
  {
    id: 'arctic-night',
    name: 'Arctic Night',
    colors: {
      primary: '#3B4252',
      secondary: '#4C566A',
      accent: '#5E81AC',
      background: '#E5E9F0',
      text: '#2E3440'
    }
  },
  {
    id: 'aurora',
    name: 'Aurora',
    colors: {
      primary: '#5E81AC',
      secondary: '#A3BE8C',
      accent: '#B48EAD',
      background: '#ECEFF4',
      text: '#2E3440'
    }
  },
  {
    id: 'winter-frost',
    name: 'Winter Frost',
    colors: {
      primary: '#4C566A',
      secondary: '#5E81AC',
      accent: '#88C0D0',
      background: '#E5E9F0',
      text: '#2E3440'
    }
  },
  {
    id: 'polar-night',
    name: 'Polar Night',
    colors: {
      primary: '#3B4252',
      secondary: '#434C5E',
      accent: '#4C566A',
      background: '#ECEFF4',
      text: '#2E3440'
    }
  }
];

interface ColorPalettePickerProps {
  onSelectPalette: (palette: ColorPalette) => void;
}

const ColorPalettePicker = ({ onSelectPalette }: ColorPalettePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPalette, setSelectedPalette] = useState(palettes[0]);

  const handleSelectPalette = (palette: ColorPalette) => {
    setSelectedPalette(palette);
    onSelectPalette(palette);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-200 hover:bg-black/5"
        style={{ color: selectedPalette.colors.secondary }}
      >
        <div className="flex space-x-1">
          {Object.values(selectedPalette.colors).slice(0, 3).map((color, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <span className="tracking-wide">{selectedPalette.name}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-full mb-2 right-0 bg-white rounded-lg shadow-xl p-3 w-56"
            style={{ backgroundColor: selectedPalette.colors.background }}
          >
            <div className="space-y-1">
              {palettes.map((palette) => (
                <button
                  key={palette.id}
                  onClick={() => handleSelectPalette(palette)}
                  className={`w-full flex items-center space-x-3 p-2 rounded-md transition-colors duration-200 ${
                    selectedPalette.id === palette.id ? 'bg-black/5' : 'hover:bg-black/5'
                  }`}
                  style={{ color: palette.colors.primary }}
                >
                  <div className="flex space-x-1">
                    {Object.values(palette.colors).slice(0, 3).map((color, i) => (
                      <div
                        key={i}
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <span className="font-medium tracking-wide">{palette.name}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ColorPalettePicker; 