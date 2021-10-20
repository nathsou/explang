import React, { createContext, FC, useMemo, useState } from "react";

const isDarkMode = (): boolean => {
  if (window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  const date = new Date();
  return date.getHours() >= 20 || date.getHours() <= 9;
};

const commonStyles = {
  borderWidth: '2px',
  borderStyle: 'solid',
  fontSize: '20px',
  margin: '4px',
  borderRadius: '4px',
};

const mode = {
  dark: {
    style: {
      backgroundColor: '#1c1c1c',
      color: 'white',
      borderColor: '#3b3b3b',
      ...commonStyles,
    },
    editorTheme: 'terminal',
  },
  light: {
    style: {
      backgroundColor: 'white',
      color: 'black',
      borderColor: 'black',
      ...commonStyles,
    },
    editorTheme: 'github',
  },
};

export const ThemeContext = createContext({
  ...mode.dark,
  isDark: true,
  setIsDark: (_isDark: boolean) => { },
});

export const ThemeProvider: FC<{}> = ({ children }) => {
  const [isDark, setIsDark] = useState(isDarkMode);
  const context = useMemo(() => {
    const theme = mode[isDark ? 'dark' : 'light'];

    return {
      isDark,
      ...theme,
      setIsDark,
    };
  }, [isDark]);

  return (
    <ThemeContext.Provider value={context}>
      {children}
    </ThemeContext.Provider>
  );
};