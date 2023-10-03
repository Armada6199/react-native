import { createContext, useContext } from 'react';

export const lightTheme = {
  backgroundColor: 'white',
  textColor: 'black',
  buttonColor: 'blue',
};

export const darkTheme = {
  backgroundColor: 'black',
  textColor: 'white',
  buttonColor: 'purple',
};

export const ThemeContext = createContext(lightTheme);

export function useTheme() {
  return useContext(ThemeContext);
}
