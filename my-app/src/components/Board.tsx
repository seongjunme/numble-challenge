import React from 'react';
import styled from 'styled-components';
import Block from './Block';
import { BOARD_SIZE } from '../global';
import { getRandom } from '../utils';

interface Props {
  stage: number;
  goNextStage: () => void;
}

const Board = ({ stage, goNextStage }: Props) => {
  const renderBlock = () => {
    const blocks = [];
    const blockCount = Math.pow(Math.round((stage + 0 / 5) / 2) + 1, 2);
    const blockSize = BOARD_SIZE / Math.sqrt(blockCount);
    const blockColor = { r: getRandom(0, 255), g: getRandom(0, 255), b: getRandom(0, 255) };
    const diffTarget = getRandom(0, blockCount - 1);
    for (let i = 0; i < blockCount; i++) {
      if (i === diffTarget) {
        const diffColor = {
          r: blockColor.r - 50,
          g: blockColor.g - 50,
          b: blockColor.b - 50,
        };
        blocks.push(<Block blockSize={blockSize} rgb={diffColor} goNextStage={goNextStage} />);
      } else {
        blocks.push(<Block blockSize={blockSize} rgb={blockColor} />);
      }
    }
    return blocks;
  };

  return <Layout>{renderBlock()}</Layout>;
};

const Layout = styled.div`
  width: ${BOARD_SIZE}px;
  height: ${BOARD_SIZE}px;
  display: flex;
  flex-flow: row wrap;
`;

export default React.memo(Board);
