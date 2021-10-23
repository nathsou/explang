import React, { FC } from 'react';
import { Button } from './Button';

export type ButtonAction = (code: string, setOutput: (output: string) => void) => void | Promise<void>;
export type ButtonActions = Record<string, ButtonAction>;

interface ActionProps {
  onClick: (actionName: string) => void,
  actions: ButtonActions,
}

export const Actions: FC<ActionProps> = ({ actions, onClick }) => {
  return <>
    {Object.keys(actions).map(name => (
      <Button
        onClick={() => onClick(name)}
        key={`action-${name}`}
      >
        {name}
      </Button>
    ))}
  </>;
};