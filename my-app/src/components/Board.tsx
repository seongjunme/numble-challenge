import React from 'react';
import styled from 'styled-components';
import Block from './Block';
import { BOARD_SIZE, MAX_STAGE } from '../global';
import { getRandom } from '../utils';

interface Props {
  stage: number;
  goNextStage: () => void;
  decreaseTime: () => void;
}

const Board = ({ stage, goNextStage, decreaseTime }: Props) => {
  const renderBlock = () => {
    const blocks = [];
    const blockCount = Math.pow(Math.round((stage + 0 / 5) / 2) + 1, 2);
    const blockSize = BOARD_SIZE / Math.sqrt(blockCount);
    const blockColor = {
      r: getRandom(MAX_STAGE, 255),
      g: getRandom(MAX_STAGE, 255),
      b: getRandom(MAX_STAGE, 255),
    };
    const diffTarget = getRandom(0, blockCount - 1);

    for (let i = 0; i < blockCount; i++) {
      if (i === diffTarget) {
        const diffColor = {
          r: blockColor.r - (MAX_STAGE - stage),
          g: blockColor.g - (MAX_STAGE - stage),
          b: blockColor.b - (MAX_STAGE - stage),
        };

        blocks.push(<Block blockSize={blockSize} rgb={diffColor} onClickHandler={goNextStage} />);
      } else {
        blocks.push(<Block blockSize={blockSize} rgb={blockColor} onClickHandler={decreaseTime} />);
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
