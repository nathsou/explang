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

async function* iter(actionRet: ReturnType<ButtonActions[string]>): AsyncGenerator<string> {
  if (typeof actionRet === 'string' || typeof actionRet === 'object' && 'then' in actionRet) {
    yield actionRet;
  } else if (typeof actionRet === 'object' && (Symbol.iterator in actionRet || Symbol.asyncIterator in actionRet)) {
    for await (const val of actionRet) {
      yield val;
    }
  }
}

export const Playground: FC<PlaygroundProps> = ({ actions, samples, aceMode }) => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const renderSplitter = useCallback(() => <SolidSplitter />, []);
  const onAction = useCallback(async (name: string) => {
    for await (const output of iter(actions[name](code))) {
      setOutput(output);
    }
  }, [actions, code]);

  return (
    <ThemeProvider>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Panel
          actions={actions}
          samples={samples}
          onAction={onAction}
          onSelectSample={code => setCode(code)}
        />
        <Split splitterSize='10px' renderSplitter={renderSplitter}>
          <Editor aceMode={aceMode} code={code} onChange={setCode} />
          <Console text={output} />
        </Split>
      </div>
    </ThemeProvider>
  );
};