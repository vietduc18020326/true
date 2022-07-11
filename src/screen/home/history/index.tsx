import React from 'react'
// @ts-ignore
import styled from "styled-components/native";
import {Text, TouchableOpacity, View} from "react-native";

import Container from "../../components/Container";
import Header from '../../components/Header'
import {ICONS} from "../../../assets";
import {useNavigation} from "@react-navigation/native";

const Icon = styled.Image`
  width: 24px;
  height: 24px;
`

const list = [
    {
        iconLeft: ICONS.phone,
        name: 'Nguyen Tien Nam',
        phoneNumber: '0429427544',
        history: 'Hom nay',
        iconRight: ICONS.info_outline
    },
    {
        iconLeft: ICONS.phone,
        name: 'Vu Manh Linh',
        phoneNumber: '04244227544',
        history: 'Hom nay',
        iconRight: ICONS.info_outline
    },
    {
        iconLeft: ICONS.phone,
        name: 'Tran Thai Ha',
        phoneNumber: '042942742542',
        history: 'Hom nay',
        iconRight: ICONS.info_outline
    },
    {
        iconLeft: ICONS.phone,
        name: 'Nguyen Ngoc Linh',
        phoneNumber: '04294929294',
        history: 'Thu Tu',
        iconRight: ICONS.info_outline
    },
    {
        iconLeft: ICONS.phone,
        name: 'Nguyen Tien Nam',
        phoneNumber: '0429427544',
        history: 'Hom nay',
        iconRight: ICONS.info_outline
    },
    {
        iconLeft: ICONS.phone,
        name: 'Nguyen Tien Nam',
        phoneNumber: '0429427544',
        history: 'Hom nay',
        iconRight: ICONS.info_outline
    },
    {
        iconLeft: ICONS.missed_video_call,
        name: 'Bao Ngoc',
        phoneNumber: '04294243414',
        history: 'Thu Hai',
        iconRight: ICONS.info_outline
    },
    {
        iconLeft: ICONS.missed_video_call,
        name: 'Duong Le',
        phoneNumber: '04294413415',
        history: 'Thu Bay',
        iconRight: ICONS.info_outline
    },
]

interface CellProps {
    iconLeft: any,
    name: string,
    phoneNumber: string,
    history: string,
    iconRight: any
}

const WrapCell = styled.View`
  width: 100%;
  height: 64px;
  flex-direction: row;
`
const WrapRightCell = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  flex: 5;
  padding-right: 16px;
  border-bottom-width: 1px;
  border-bottom-color: #00000016;
`
const WrapText = styled.View`
  flex: 2;
  justify-content: center;
`

const Name = styled.Text`
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0.12px;
  color: #333333;
  margin-bottom: 8px;
`

const Info = styled.Text`
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.12px;
  color: #828282;
  margin-right: 20px;
`

const WrapInfo = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  flex: 1;
  align-items: center;
`

const FlatList = styled.FlatList`
  margin-top: 10px;
`


const Cell = ({iconLeft,name,phoneNumber,history,iconRight} : CellProps) => (
    <WrapCell>
        <View style={{flex: 1, alignItems: 'center', paddingTop: 7}}>
            <Icon source={iconLeft}/>
        </View>
        <WrapRightCell>
            <WrapText>
                <Name>{name}</Name>
                <Info>{phoneNumber}</Info>
            </WrapText>
            <WrapInfo>
                <Info>{history}</Info>
                <Icon source={iconRight}/>
            </WrapInfo>
        </WrapRightCell>
    </WrapCell>
)

const HistoryScreen = () => {
    const navigation = useNavigation<any>()

    return (
        <Container>
            <Header
                title={'Lich sử'}
                renderLeftButton={() => (
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Icon source={ICONS.more} resizeMode={'stretch'}/>
                    </TouchableOpacity>
                )}
                renderRightButton={() => (
                    <TouchableOpacity onPress={() => navigation.navigate('Create_contact')}>
                        <Icon source={ICONS.camera} resizeMode={'stretch'}/>
                    </TouchableOpacity>
                )}/>
            <FlatList
                data={list}
                keyExtractor={(item: any,index: number) => item.name + index.toString()}
                renderItem={({item}: any) => (
                    <Cell {...item}/>
                )}
            />
        </Container>
    );
}

export default HistoryScreen;
