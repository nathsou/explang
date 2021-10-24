import React, { FC, useCallback, useContext } from 'react';
import { Actions, ButtonActions } from './Actions';
import { Button } from './Button';
import { Samples, SampleSelector } from './SampleSelector';
import { ThemeContext } from './ThemeProvider';

interface PanelProps {
  actions: ButtonActions,
  onAction: (actionName: string) => void,
  onSelectSample: (code: string) => void,
  samples: Samples,
}

export const Panel: FC<PanelProps> = ({
  onAction, actions, samples, onSelectSample
}) => {
  const { isDark, setIsDark } = useContext(ThemeContext);
  const toggleDarkMode = useCallback(() => {
    setIsDark(!isDark);
  }, [isDark]);

  return <div
    style={{
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: isDark ? 'black' : 'white',
      borderBottom: `2px solid silver`
    }}
  >
    <Actions actions={actions} onClick={onAction} />
    <SampleSelector samples={samples} onSelect={onSelectSample} />
    <Button onClick={toggleDarkMode}>{`${isDark ? 'Light' : 'Dark'} Mode`}</Button>
  </div>;
};