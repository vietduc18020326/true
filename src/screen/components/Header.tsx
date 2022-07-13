import React from 'react'
// @ts-ignore
import styled from "styled-components/native";
import {View, Platform, StatusBar} from "react-native";
import {getStatusBarHeight} from "react-native-iphone-x-helper";
import {Colors} from "../../themes/Colors";

const HeaderView = styled.View<{backgroundColor?: string;}>`
  width: 100%;
  //background-color: ${(p: { backgroundColor: any; }) => p.backgroundColor ? p.backgroundColor : '#ffffff'};
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 8px;
`

const Title = styled.Text`
  font-weight: 500;
  font-size: 24px;
  text-align: center;
  color: ${Colors.darkCharcoal};
`


const Header = ({renderLeftButton, title, renderRightButton,backgroundColor} : {title?: string; renderLeftButton?: Function; renderRightButton?: Function;backgroundColor?: string;}) => {
    return (
        <View style={{paddingTop: getStatusBarHeight() + 16,backgroundColor: backgroundColor ?? '#ffffff'}}>
            <StatusBar translucent backgroundColor={backgroundColor ? 'transparent' : '#ffffff'} barStyle={'dark-content'}/>
            <HeaderView>
                {renderLeftButton && renderLeftButton()}
                {title && <Title>{title}</Title>}
                {renderRightButton && renderRightButton()}
            </HeaderView>
        </View>
    )
}

export default Header
