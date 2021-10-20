import React, { FC, useContext } from 'react';
import AceEditor, { IAceEditorProps } from "react-ace";
import "ace-builds/src-noconflict/mode-rust";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-terminal";
import { ThemeContext } from './ThemeProvider';

export interface EditorProps {
  code: string,
  onChange: (newCode: string) => void,
  aceMode: IAceEditorProps['mode'],
}

export const Editor: FC<EditorProps> = ({ code, onChange }) => {
  const { editorTheme } = useContext(ThemeContext);

  return (
    <AceEditor
      mode='rust'
      width={'100vw'}
      height={'calc(100vh - 39px)'}
      value={code}
      theme={editorTheme}
      enableLiveAutocompletion={true}
      onChange={onChange}
      fontSize={16}
      editorProps={{ $blockScrolling: true }}
      setOptions={{ tabSize: 2 }}
    />);
};