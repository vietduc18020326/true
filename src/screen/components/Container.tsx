import React, {ReactNode} from 'react'
// @ts-ignore
import styled from "styled-components/native";

const Wrap = styled.View<{backgroundColor?: string}>`
  flex: 1;
  background-color: ${(p: { backgroundColor?: string; }) => p.backgroundColor ? p.backgroundColor : '#ffffff'};
`;

const Container = ({children,backgroundColor}: {children: ReactNode;backgroundColor?: string}) => {
    return (
        <Wrap backgroundColor={backgroundColor}>
            {children}
        </Wrap>
    )
}

export default Container;
