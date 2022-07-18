import React, {memo, useCallback} from 'react';
// @ts-ignore
import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native';

import Container from '@/screen/components/Container';
import Header from '@/screen/components/Header';
import {CAMERA, INFO_OUTLINE, MISSED_VIDEO_CALL, MORE, PHONE} from '@/assets';
import {Colors} from '@/themes/Colors';
import {navigateToCreateContactScreen, openDrawer} from '@/utils/navigation';

const Icon = styled.Image`
  width: 24px;
  height: 24px;
`;

const list = [
  {
    iconLeft: PHONE,
    name: 'Nguyen Tien Nam',
    phoneNumber: '0429427544',
    history: 'Hom nay',
    iconRight: INFO_OUTLINE,
  },
  {
    iconLeft: PHONE,
    name: 'Vu Manh Linh',
    phoneNumber: '04244227544',
    history: 'Hom nay',
    iconRight: INFO_OUTLINE,
  },
  {
    iconLeft: PHONE,
    name: 'Tran Thai Ha',
    phoneNumber: '042942742542',
    history: 'Hom nay',
    iconRight: INFO_OUTLINE,
  },
  {
    iconLeft: PHONE,
    name: 'Nguyen Ngoc Linh',
    phoneNumber: '04294929294',
    history: 'Thu Tu',
    iconRight: INFO_OUTLINE,
  },
  {
    iconLeft: PHONE,
    name: 'Nguyen Tien Nam',
    phoneNumber: '0429427544',
    history: 'Hom nay',
    iconRight: INFO_OUTLINE,
  },
  {
    iconLeft: PHONE,
    name: 'Nguyen Tien Nam',
    phoneNumber: '0429427544',
    history: 'Hom nay',
    iconRight: INFO_OUTLINE,
  },
  {
    iconLeft: MISSED_VIDEO_CALL,
    name: 'Bao Ngoc',
    phoneNumber: '04294243414',
    history: 'Thu Hai',
    iconRight: INFO_OUTLINE,
  },
  {
    iconLeft: MISSED_VIDEO_CALL,
    name: 'Duong Le',
    phoneNumber: '04294413415',
    history: 'Thu Bay',
    iconRight: INFO_OUTLINE,
  },
];

interface CellProps {
  iconLeft: any;
  name: string;
  phoneNumber: string;
  history: string;
  iconRight: any;
}

const WrapCell = styled.View`
  width: 100%;
  height: 64px;
  flex-direction: row;
`;
const WrapRightCell = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  flex: 5;
  padding-right: 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.black10};
`;
const WrapText = styled.View`
  flex: 2;
  justify-content: center;
`;

const Name = styled.Text`
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0.12px;
  color: ${Colors.darkCharcoal};
  margin-bottom: 8px;
`;

const Info = styled.Text`
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.12px;
  color: ${Colors.oldSilver};
  margin-right: 20px;
`;

const WrapInfo = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  flex: 1;
  align-items: center;
`;

const FlatList = styled.FlatList`
  margin-top: 10px;
`;

const WrapIconLeft = styled.View`
  flex: 1;
  align-items: center;
  padding-top: 7px;
`;

const Cell = ({iconLeft, name, phoneNumber, history, iconRight}: CellProps) => (
  <WrapCell>
    <WrapIconLeft>
      <Icon source={iconLeft} />
    </WrapIconLeft>
    <WrapRightCell>
      <WrapText>
        <Name>{name}</Name>
        <Info>{phoneNumber}</Info>
      </WrapText>
      <WrapInfo>
        <Info>{history}</Info>
        <Icon source={iconRight} />
      </WrapInfo>
    </WrapRightCell>
  </WrapCell>
);

const keyExtractor = (item: any, index: number) => item.name + index.toString();

const HistoryScreen = () => {
  const onNavToCreateContactScreen = useCallback(() => {
    navigateToCreateContactScreen();
  }, [navigateToCreateContactScreen]);

  const renderLeftButton = useCallback(
    () => (
      <TouchableOpacity onPress={openDrawer}>
        <Icon source={MORE} resizeMode={'stretch'} />
      </TouchableOpacity>
    ),
    [openDrawer],
  );

  const renderRightButton = useCallback(
    () => (
      <TouchableOpacity onPress={onNavToCreateContactScreen}>
        <Icon source={CAMERA} resizeMode={'stretch'} />
      </TouchableOpacity>
    ),
    [onNavToCreateContactScreen],
  );

  const renderItem = useCallback(({item}: any) => <Cell {...item} />, []);

  return (
    <Container>
      <Header
        title={'Lich sử'}
        renderLeftButton={renderLeftButton}
        renderRightButton={renderRightButton}
      />
      <FlatList
        data={list}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </Container>
  );
};

export default memo(HistoryScreen);
