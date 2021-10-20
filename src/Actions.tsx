import React, { FC } from 'react';
import { Button } from './Button';

export type ButtonAction = (code: string) => string | PromiseLike<string> | Iterable<string> | AsyncIterable<string>;
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