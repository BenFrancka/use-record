import React from 'react';
import { useRecord } from '../../hooks/useRecord';

export default function App() {
  const { current, undo, redo, record } = useRecord('#ff0000');

  return (
    <>
      <button aria-label="undo-button" onClick={undo}>
        undo
      </button>
      <button aria-label="redo-button" onClick={redo}>
        redo
      </button>
      <input
        aria-label="color-input"
        type="color"
        value={current}
        onChange={({ target }) => record(target.value)}
      />
      <div
        aria-label="display"
        style={{ backgroundColor: current, width: '10rem', height: '10rem' }}
      ></div>
    </>
  );
}
