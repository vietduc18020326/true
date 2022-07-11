import React from 'react'
// @ts-ignore
import styled from "styled-components/native";

import Container from "../components/Container";
import Header from '../components/Header'
import {ICONS} from "../../assets";

const Icon = styled.Image`
  width: 24px;
  height: 24px;
`

const HomeScreen = () => {
    return (
        <Container>
            <Header
                title={'Liên hệ'}
                renderLeftButton={() => (
                    <Icon source={ICONS.more} resizeMode={'stretch'}/>
                )}
                renderRightButton={() => (
                    <Icon source={ICONS.camera} resizeMode={'stretch'}/>
                )}/>
        </Container>
    );
}

export default HomeScreen;
