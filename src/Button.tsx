import React, { FC, useContext } from 'react';
import { ThemeContext } from './ThemeProvider';

interface ButtonProps {
  onClick: () => void,
}

export const Button: FC<ButtonProps> = ({ children, onClick }) => {
  const { style } = useContext(ThemeContext);

  return (
    <button
      onClick={onClick}
      style={style}
    >
      {children}
    </button >
  );
};