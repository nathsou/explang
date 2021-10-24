import React, { FC, useContext, useEffect, useState } from 'react';
import { ThemeContext } from './ThemeProvider';

export type Samples = Record<string, string>;

interface SampleSelectorProps {
  onSelect: (code: string) => void,
  samples: Samples,
  defaultSample?: string,
}

export const SampleSelector: FC<SampleSelectorProps> = ({ samples, onSelect, defaultSample = samples[0] }) => {
  const [selectedSample, setSelectedSample] = useState(defaultSample);
  const { style: theme } = useContext(ThemeContext);

  useEffect(() => {
    // send the source code for the default sample during the first render
    onSelect(samples[selectedSample]);
  }, []);

  return (
    <select
      value={selectedSample}
      style={theme}
      onChange={e => {
        const sample = e.target.value;
        setSelectedSample(sample);
        onSelect(samples[sample]);
      }}
    >
      {Object.keys(samples).map((name) => (
        <option key={name}>{name}</option>
      ))}
    </select>
  );
};