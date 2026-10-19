import { createContext, useContext } from 'react';

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

// beamlynx-ui's own dark theme (styles/palette/themes.ts there), so the
// site's chrome (nav, footer, body colour) matches the app it shows.
export const appDark: ColorPalette = {
  primary: '#c0caf5',
  secondary: '#8890b5',
  accent: '#7aa2f7',
  background: '#1a1b26',
  text: '#c0caf5'
};

export const ColorPaletteContext = createContext<ColorPalette>(appDark);

export const useColorPalette = () => useContext(ColorPaletteContext);
