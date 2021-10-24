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

const getTheme = (
  isDark: boolean,
  darkTheme = 'terminal',
  lightTheme = 'github'
) => {
  if (isDark) {
    return {
      style: {
        backgroundColor: '#1c1c1c',
        color: 'white',
        borderColor: '#3b3b3b',
        ...commonStyles,
      },
      editorTheme: darkTheme,
    };
  } else {
    return {
      style: {
        backgroundColor: 'white',
        color: 'black',
        borderColor: 'black',
        ...commonStyles,
      },
      editorTheme: lightTheme,
    };
  }
};

export const ThemeContext = createContext({
  ...getTheme(true),
  isDark: true,
  setIsDark: (_isDark: boolean) => { },
});

export const ThemeProvider: FC<{ lightTheme?: string, darkTheme?: string }> = ({
  children,
  lightTheme,
  darkTheme
}) => {
  const [isDark, setIsDark] = useState(isDarkMode);
  const context = useMemo(() => {
    const theme = getTheme(isDark, darkTheme, lightTheme);

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