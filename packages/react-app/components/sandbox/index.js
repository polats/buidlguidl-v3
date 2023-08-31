import cn from 'clsx';
import React, { useCallback, useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
  Position
} from 'reactflow';
import StackNode from './StackNode';
import 'reactflow/dist/style.css';
import styles from './style.module.css'
import dynamic from "next/dynamic";

const nodeTypes = {
  stack: StackNode
}

const ReactJson = dynamic(
  () => import('react-json-view'),
  { ssr: false}
)

const nodeDefaults = {
  sourcePosition: Position.Bottom,
  targetPosition: Position.Top,
  style: {
    borderRadius: '0%',
    backgroundColor: '#fff',
    fontSize: 20,
    width: 50,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const initialNodes = [
  { id: '1', type: 'stack', position: { x: 50, y: 50 }, 
    data: { 
        label: "Arcadian #1", 
        image:  "https://images.arcadians.io/arcadian-205ed7da-2e72-4264-8ff7-b412c9ec3cd6.png",
        emoji: '😄' 
      } 
  },
  { id: '2', type: 'stack', position: { x: 200, y: 200 }, 
  data: { 
    label: "Valorous Blade", 
    image:  "https://arcadians.prod.outplay.games/v2/items/image/259",
    emoji: '🗡️' 
    } 
  },
  { id: '3', type: 'stack', position: { x: 400, y: 50 }, 
  data: { 
    label: "Renderer (XGR)", 
    emoji: '🎮' 
    } 
  },
  { id: '4', type: 'stack', position: { x: 400, y: 150 }, 
  data: { 
    label: "Self (OpenAI)", 
    emoji: '🎭' 
    } 
  },
  { id: '5', type: 'stack', position: { x: 400, y: 250 }, 
  data: { 
    label: "Voice (RunwayML)", 
    emoji: '🗣️' 
    } 
  },
  { id: '6', type: 'stack', position: { x: 400, y: 350 }, 
  data: { 
    label: "Art (Midjourney)", 
    emoji: '🎨' 
    } 
  },
  { id: '7', type: 'stack', position: { x: 400, y: 450 }, 
  data: { 
    label: "Lore (Laika)", 
    emoji: '✒️' 
    } 
  },
  { id: '8', type: 'stack', position: { x: 600, y: 50 }, 
  data: { 
      label: "NFT2NPC Arcadian", 
      image:  "https://images.arcadians.io/arcadian-205ed7da-2e72-4264-8ff7-b412c9ec3cd6.png",
      emoji: '😄' 
    } 
},

,
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

export function GameWindow({
  children, ...props}) {
  return (
    <div 
        className={cn(
          styles.gamewindow,
        )}
        {...props}
    >
        {children}
    </div>
  )
}

export function Gameboard() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [rfInstance, setRfInstance] = useState(null);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
  const proOptions = { hideAttribution: true };

  const updateReactFlow = async (e) => {
    // const address = e.updated_src.address;
    // const tokenid = e.updated_src.tokenid;
    // const client = getViemClient("goerli");
    // const tokenboundAddress = await getAccount(
    //   address, tokenid, client);
    
    // setTokenboundAddress(tokenboundAddress);
    console.log(rfInstance)
  }

  return (
    <GameWindow
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setRfInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
      >
        <MiniMap position={"bottom-left"} zoomable pannable/>
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>

      <ReactJson src={nodes} theme="hopscotch" onEdit={updateReactFlow} enableClipboard={true}/>


    </GameWindow>
  );
}