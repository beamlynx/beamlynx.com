import React, { createContext, useContext, useMemo, useCallback } from 'react';

interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

// beamlynx-ui's own dark theme (styles/palette/themes.ts there), so the
// site's chrome (nav, footer, body colour) matches the app it shows.
const appDark: ColorPalette = {
  primary: '#c0caf5',
  secondary: '#8890b5',
  accent: '#7aa2f7',
  background: '#1a1b26',
  text: '#c0caf5'
};

const ColorPaletteContext = createContext<ColorPalette>(appDark);

export const useColorPalette = () => useContext(ColorPaletteContext);

export const ColorPaletteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const applyColors = useCallback(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', appDark.primary);
    root.style.setProperty('--color-secondary', appDark.secondary);
    root.style.setProperty('--color-accent', appDark.accent);
    root.style.setProperty('--color-background', appDark.background);
    root.style.setProperty('--color-text', appDark.text);

    document.body.style.backgroundColor = appDark.background;
    document.body.style.color = appDark.text;
  }, []);

  React.useEffect(() => {
    applyColors();
  }, [applyColors]);

  const value = useMemo(() => appDark, []);

  return (
    <ColorPaletteContext.Provider value={value}>
      {children}
    </ColorPaletteContext.Provider>
  );
};

export default ColorPaletteContext; 