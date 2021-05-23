import React from 'react';
import ReactDOM from 'react-dom';
import ReactFlow, { Elements } from 'react-flow-renderer';

export const init = (hookableEl, elements: Elements, clickEvent) => {
  ReactDOM.render(
    <React.StrictMode>
      <div style={{ height: '100vh', width: '100vw' }}>
        <ReactFlow onClick={clickEvent} elements={elements} />
      </div>
    </React.StrictMode>,
    hookableEl
  );
};
