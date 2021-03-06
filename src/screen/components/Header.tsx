import React from 'react';
import styled from 'styled-components/native';
import {View, Platform, StatusBar} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {Colors} from '@/themes/Colors';

const WrapHeader = styled.View<{backgroundColor: string}>`
  padding-top: ${getStatusBarHeight() + 16}px;
  background-color: ${p => p.backgroundColor ?? Colors.white};
`;

const HeaderView = styled.View`
  width: 100%;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 8px;
`;

const Title = styled.Text`
  font-weight: 500;
  font-size: 24px;
  text-align: center;
  color: ${Colors.darkCharcoal};
`;

interface Props {
  title?: string;
  renderLeftButton?: Function;
  renderRightButton?: Function;
  backgroundColor?: string;
}

const Header = ({
  renderLeftButton,
  title,
  renderRightButton,
  backgroundColor,
}: Props) => {
  return (
    <WrapHeader backgroundColor={backgroundColor}>
      <StatusBar
        translucent
        backgroundColor={backgroundColor ? Colors.transparent : Colors.white}
        barStyle={'dark-content'}
      />
      <HeaderView>
        {renderLeftButton && renderLeftButton()}
        {title && <Title>{title}</Title>}
        {renderRightButton && renderRightButton()}
      </HeaderView>
    </WrapHeader>
  );
};

export default Header;
