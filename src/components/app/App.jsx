import React from 'react';

export default function App() {
  return (
    <>
      <button onClick={undo}>undo</button>
      <button onClick={redo}>redo</button>
      <input
        type="color"
        value={current}
        onChange={({ target }) => record(target.value)}
      />
      <div
        style={{ backgroundColor: current, width: '10rem', height: '10rem' }}
      ></div>
    </>
  );
}
