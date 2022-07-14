import React, {ReactNode} from 'react';
import styled from 'styled-components/native';

import {Colors} from '@/themes/Colors';

const Wrap = styled.View<{backgroundColor?: string}>`
  flex: 1;
  background-color: ${p =>
    p.backgroundColor ? p.backgroundColor : Colors.white};
`;

const Container = ({
  children,
  backgroundColor,
}: {
  children: ReactNode;
  backgroundColor?: string;
}) => {
  return <Wrap backgroundColor={backgroundColor}>{children}</Wrap>;
};

export default Container;
