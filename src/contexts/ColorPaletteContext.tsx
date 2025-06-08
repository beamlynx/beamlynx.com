import React, { createContext, useContext, useMemo, useCallback } from 'react';

interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

const nordicMinimal: ColorPalette = {
  primary: '#2E3440',
  secondary: '#4C566A',
  accent: '#5E81AC',
  background: '#ECEFF4',
  text: '#2E3440'
};

const ColorPaletteContext = createContext<ColorPalette>(nordicMinimal);

export const useColorPalette = () => useContext(ColorPaletteContext);

export const ColorPaletteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const applyColors = useCallback(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', nordicMinimal.primary);
    root.style.setProperty('--color-secondary', nordicMinimal.secondary);
    root.style.setProperty('--color-accent', nordicMinimal.accent);
    root.style.setProperty('--color-background', nordicMinimal.background);
    root.style.setProperty('--color-text', nordicMinimal.text);
    
    document.body.style.backgroundColor = nordicMinimal.background;
    document.body.style.color = nordicMinimal.text;
  }, []);

  React.useEffect(() => {
    applyColors();
  }, [applyColors]);

  const value = useMemo(() => nordicMinimal, []);

  return (
    <ColorPaletteContext.Provider value={value}>
      {children}
    </ColorPaletteContext.Provider>
  );
};

export default ColorPaletteContext; 