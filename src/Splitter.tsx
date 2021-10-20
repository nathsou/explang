import React, { FC } from "react";

export const SolidSplitter: FC<{}> = ({ children }) => {
  return (
    <div style={{
      background: 'silver',
      cursor: 'col-resize',
      width: '100%',
      height: '100%',
      outline: 'none',
      overflow: 'hidden'
    }}>
      {children}
    </div>
  );
};