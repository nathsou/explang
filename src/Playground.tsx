import { Split } from '@geoffcox/react-splitter';
import React, { FC, useCallback, useState } from 'react';
import { ButtonActions } from './Actions';
import { Console } from './Console';
import { Editor, EditorProps } from './Editor';
import { Panel } from './Panel';
import { Samples } from './SampleSelector';
import { SolidSplitter } from './Splitter';
import { ThemeProvider } from './ThemeProvider';

export type PlaygroundProps = {
  actions: ButtonActions,
  samples: Samples,
  aceMode?: EditorProps['aceMode'],
};

export const Playground: FC<PlaygroundProps> = ({ actions, samples, aceMode }) => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const renderSplitter = useCallback(() => <SolidSplitter />, []);
  const onAction = useCallback(async (name: string) => {
    await Promise.resolve(actions[name](code, setOutput));
  }, [actions, code]);

  return (
    <ThemeProvider>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Panel
          actions={actions}
          samples={samples}
          onAction={onAction}
          onSelectSample={setCode}
        />
        <Split splitterSize='10px' renderSplitter={renderSplitter}>
          <Editor aceMode={aceMode} code={code} onChange={setCode} />
          <Console text={output} />
        </Split>
      </div>
    </ThemeProvider>
  );
};