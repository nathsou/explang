import React, { FC, useContext } from 'react';
import * as AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-text";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-terminal";
import { ThemeContext } from './ThemeProvider';

interface ConsoleProps {
  text: string
}

export const Console: FC<ConsoleProps> = ({ text }) => {
  const { editorTheme } = useContext(ThemeContext);

  return (
    <AceEditor.default
      mode='text'
      width={'100vw'}
      height={'calc(100vh - 39px)'}
      value={text}
      theme={editorTheme}
      enableLiveAutocompletion={true}
      onChange={() => null}
      fontSize={16}
      editorProps={{ $blockScrolling: true }}
      setOptions={{ showLineNumbers: true, tabSize: 2 }}
    />);
};