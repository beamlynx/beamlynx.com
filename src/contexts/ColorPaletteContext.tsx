import React, { useMemo, useCallback } from 'react';
import { appDark, ColorPaletteContext } from './colorPalette';

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
