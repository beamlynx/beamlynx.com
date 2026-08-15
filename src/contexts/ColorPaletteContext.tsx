import React, { createContext, useContext, useMemo, useCallback } from 'react';

interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

// Beamlynx's "schematic/blueprint" identity - beamlynx-ui's own dark
// --canvas-* palette, reused verbatim here so the marketing site's chrome
// (nav, footer, this context's body color/bg) reads as the same brand as
// the app rather than a second palette invented for the site alone.
const blueprint: ColorPalette = {
  primary: '#dbeeff',
  secondary: '#6f97b5',
  accent: '#4fd1ff',
  background: '#0a1826',
  text: '#dbeeff'
};

const ColorPaletteContext = createContext<ColorPalette>(blueprint);

export const useColorPalette = () => useContext(ColorPaletteContext);

export const ColorPaletteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const applyColors = useCallback(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', blueprint.primary);
    root.style.setProperty('--color-secondary', blueprint.secondary);
    root.style.setProperty('--color-accent', blueprint.accent);
    root.style.setProperty('--color-background', blueprint.background);
    root.style.setProperty('--color-text', blueprint.text);

    document.body.style.backgroundColor = blueprint.background;
    document.body.style.color = blueprint.text;
  }, []);

  React.useEffect(() => {
    applyColors();
  }, [applyColors]);

  const value = useMemo(() => blueprint, []);

  return (
    <ColorPaletteContext.Provider value={value}>
      {children}
    </ColorPaletteContext.Provider>
  );
};

export default ColorPaletteContext; 