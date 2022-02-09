import React from 'react';
import styled from 'styled-components';
import { BOARD_SIZE, BLOCK_MARGIN } from '../global';

interface Props {
  stage: number;
}

interface BlockProps {
  blockSize: number;
}

const Board = ({ stage }: Props) => {
  const renderBlock = () => {
    const blocks = [];
    const blockCount = Math.pow(Math.round((stage + 0 / 5) / 2) + 1, 2);
    const blockSize = BOARD_SIZE / Math.sqrt(blockCount);
    for (let i = 0; i < blockCount; i++) {
      blocks.push(<Block blockSize={blockSize} />);
    }
    return blocks;
  };

  return <Container>{renderBlock()}</Container>;
};

const Container = styled.div`
  width: ${BOARD_SIZE}px;
  height: ${BOARD_SIZE}px;
  display: flex;
  flex-flow: row wrap;
`;

const Block = styled.div<BlockProps>`
  margin: ${BLOCK_MARGIN}px;
  width: ${(props) => props.blockSize - BLOCK_MARGIN * 2}px;
  height: ${(props) => props.blockSize - BLOCK_MARGIN * 2}px;
  background-color: rgb(0, 150, 0);
`;

export default Board;
