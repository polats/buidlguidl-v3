import React from 'react';
import { Box } from '@chakra-ui/react';
import Image from 'next/image';

import Wrapper from './NodeWrapper';
import Handle from './Handle';
import { Position } from 'reactflow';

export default function StackNode({ data }) {
  const { label = '', image='', emoji='' } = data;

  return (
    <Wrapper label={label}>
      <Box height="100%" width="100%">
        {image ? 

          <Image src={image} width={100} height={100} alt=""/> :
          <>
          {emoji}
          </>
        }
        <Handle type="target" position={Position.Right} style={{ top: 20 }} id="shape" />
        <Handle type="target" position={Position.Right} style={{ top: 40 }} id="color" />
        <Handle type="target" position={Position.Right} style={{ top: 60 }} id="zoom" />        
      </Box>
    </Wrapper>
  );
}