import React, { useState } from 'react';

import ReactFlow, {
  addEdge,
  Background,
  Controls,
  Elements,
  MiniMap,
  ReactFlowProvider,
  removeElements
} from "react-flow-renderer";

const initialElements = [
  {
    id: '1',
    type: 'input',
    data: {
      label: (
        <>
          <small>
            <strong>Start a conversation:</strong>
          </small>{' '}
          <br />
          How can I help you?
        </>
      )
    },
    position: { x: 250, y: 0 }
  },
  {
    id: '2',
    data: {
      label: (
        <>
          <small>
            <strong>Bot answers:</strong>
          </small>{' '}
          <br />
          I'm here to make your life <strong>easier</strong>.
        </>
      )
    },
    position: { x: 0, y: 100 }
  },
  {
    id: '3',
    data: {
      label: (
        <>
          <small>
            <strong>Bot answers:</strong>
          </small>{' '}
          <br />
          Sure what <strong>kind</strong> are you looking for?
        </>
      )
    },
    position: { x: 375, y: 125 },
    style: {
      background: '#D6D5E6',
      color: '#333',
      border: '1px solid #222138',
      width: 180
    }
  },
  {
    id: '5',
    data: {
      label: (
        <>
          <small>
            <strong>Bot answers: </strong>
          </small>{' '}
          <br />
          How about<strong>@braks Burger Place</strong>?
        </>
      )
    },
    position: { x: 250, y: 275 }
  },
  {
    id: '6',
    type: 'output',
    data: {
      label: (
        <>
          <small>
            <strong>Bot answers: </strong>
          </small>{' '}
          <br />
          Okay, have a <strong>nice day!</strong>
        </>
      )
    },
    position: { x: 100, y: 450 }
  },
  {
    id: '7',
    type: 'output',
    data: {
      label: (
        <>
          <small>
            <strong>Bot answers: </strong>
          </small>{' '}
          <br />I will <strong>order</strong> the burger for you.
        </>
      )
    },
    position: { x: 400, y: 450 }
  },
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    label: <>What is your purpose?</>
  },
  { id: 'e1-3', source: '1', target: '3', label: <>Is there a restaurant nearby?</> },
  {
    id: 'e3-5',
    source: '3',
    target: '5',
    animated: true,
    label: <>I want a burger!</>
  },
  {
    id: 'e5-6',
    source: '5',
    target: '6',
    type: 'smoothstep',
    label: <>No, thanks.</>
  },
  {
    id: 'e5-7',
    source: '5',
    target: '7',
    type: 'step',
    style: { stroke: '#f6ab6c' },
    animated: true,
    labelStyle: { fill: '#f6ab6c', fontWeight: 700 },
    label: <>Yes, please order it for me!</>
  }
] as Elements;

const OverviewFlow = ({ cb }: any) => {
  const [elements, setElements] = useState(initialElements);

  // @ts-ignore
  const onElementsRemove = (elementsToRemove: Elements) => setElements((els: Elements) => removeElements(elementsToRemove, els));
  // @ts-ignore
  const onConnect = (params: any) => setElements((els: Elements) => addEdge(params, els));

  return (
    <ReactFlowProvider>
      <ReactFlow
        elements={elements}
        onElementsRemove={onElementsRemove}
        onConnect={onConnect}
        onLoad={cb}
        snapToGrid={true}
        snapGrid={[15, 15]}
        defaultPosition={[100, 0]}
      >
        <MiniMap
          nodeStrokeColor={(n) => {
            if (n.style?.background) return String(n.style.background);
            if (n.type === 'input') return '#0041d0';
            if (n.type === 'output') return '#ff0072';
            if (n.type === 'default') return '#1a192b';

            return '#eee';
          }}
          nodeColor={(n) => {
            if (n.style?.background) return String(n.style.background);

            return '#fff';
          }}
          nodeBorderRadius={2}
        />
        <Controls />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </ReactFlowProvider>
  );
};

export default OverviewFlow;
