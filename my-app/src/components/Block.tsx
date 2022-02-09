import React from 'react';
import styled from 'styled-components';
import { BLOCK_MARGIN } from '../global';

interface Props {
  blockSize: number;
  rgb: { r: number; g: number; b: number };
}
const Block = ({ blockSize, rgb }: Props) => {
  return <Layout blockSize={blockSize} rgb={rgb}></Layout>;
};

interface LayoutProps {
  blockSize: number;
  rgb: { r: number; g: number; b: number };
}

const Layout = styled.div<LayoutProps>`
  margin: ${BLOCK_MARGIN}px;
  width: ${({ blockSize }) => blockSize - BLOCK_MARGIN * 2}px;
  height: ${({ blockSize }) => blockSize - BLOCK_MARGIN * 2}px;
  background-color: ${({ rgb: { r, g, b } }) => `rgb(${r}, ${g}, ${b})`};
`;

export default Block;
