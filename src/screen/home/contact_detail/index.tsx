import React, {useCallback, useState} from 'react'
import {TouchableOpacity, Linking, LayoutChangeEvent, View, FlatList} from 'react-native'
import {useNavigation, useRoute} from "@react-navigation/native";
// @ts-ignore
import styled from "styled-components/native";

import Container from "../../components/Container";
import Header from "../../components/Header";
import {ICONS,IMAGES} from "../../../assets";
import Avatar from "../../components/Avatar";
import { useContact} from "../../../store";
import {removeContactAction} from '../../../store/action'
import {ContactInformation} from "../../../type";
import CustomModal from '../../components/Modal'

const BackIcon = styled.Image`
  width: 28px;
  height: 28px;
`

const IconButton = styled.Image<{disable: boolean}>`
  width: 24px;
  height: 24px;
  tint-color: ${(p: { disable: boolean; }) => p.disable ? '#DADADA' : '#FFFFFF'};
`

const WrapIconButton = styled.View<{disable: boolean}>`
  width: 40px;
  height: 40px;
  border-radius: 24px;
  background-color: ${(p: { disable: boolean; }) => p.disable ? '#FFFFFF': '#F2A54A'};
  justify-content: center;
  align-items: center;
  margin-bottom: 4px;
  border-color: ${(p: { disable: boolean; }) => p.disable ? '#BDBDBD': '#F2A54A'};
  border-width: 0.5px;
`

const TitleButton = styled.Text`
  font-weight: 400;
  font-size: 11px;
  line-height: 22px;
  letter-spacing: -0.41px;
  color: ${(p: { disable: boolean; }) => p.disable ? '#BDBDBD': '#F2A54A'};
`

const WrapButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 80%;
`

const WrapButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`

const CustomButton = ({icon,title,disable,onPress}: {
    icon: any;
    title: string;
    disable: boolean;
    onPress: Function;
}) => {
    return (
        <WrapButton disabled={disable} onPress={onPress}>
            <WrapIconButton disable={disable}>
                <IconButton disable={disable} source={icon}/>
            </WrapIconButton>
            <TitleButton disable={disable}>{title}</TitleButton>
        </WrapButton>
    )
}

const TextButtonHeader = styled.Text`
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: -0.41px;
  color: #F2A54A;
`

const WrapHeaderItem = styled.View`
  background-color: #F2A54A10;
  align-items: center;
  width: 100%;
  padding-top: 8px;
  padding-bottom: 8px;
`

const HeaderView = styled.View<{top: number}>`
  position: absolute;
  top: ${(p: { top: any; }) => p.top}px;
  left: 0;
  bottom: 300px;
  right: 0;
  background-color: #F2A54A10;
`

const WrapTitleHeader = styled.View`
  padding-bottom: 20px;
  padding-top: 20px;
  align-items: center;
`

const CustomTitleHeaderItem = styled.Text`
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: -0.41px;
  color: #333333;
`

const CustomSubTitleHeaderItem = styled(CustomTitleHeaderItem)`
  font-weight: 400;
  font-size: 13px;
  color: #828282;
`

const CustomContactItem = styled.View`
  //height: 200px;
  border-bottom-width: 1px;
  border-bottom-color: #00000016;
  margin-left: 16px;
  margin-right: 16px;
  margin-bottom: 8px;
  padding-top: 8px;
  padding-bottom: 8px;
`

const CustomEmailItem = styled(CustomContactItem)`
  margin-bottom: 24px;
`

const CustomNoteItem = styled(CustomContactItem)`
  margin-bottom: 0px;
  height: 64px;
`

const CustomContactButton = styled(CustomContactItem)`
  height: 44px;
  margin-bottom: 0px;
  justify-content: center;
`

const CustomTitleButtonBody = styled.Text`
  font-weight: 400;
  font-size: 15px;
  line-height: 22px;
  letter-spacing: -0.41px;
  color: #333333;
`

const CustomTitleDeleteButton = styled(CustomTitleButtonBody)`
  color: #FF4A4A;
`

const TitleContact = styled.Text`
  font-weight: 400;
  font-size: 13px;
  line-height: 22px;
  letter-spacing: -0.41px;
  color: #333333;
  margin-bottom: 3px;
`

const SubTitleContact = styled.Text`
  font-weight: 400;
  font-size: 17px;
  line-height: 22px;
  letter-spacing: -0.41px;
  color: #2F80ED;
`

const CustomTextButton = ({item,onHandleAction}: {
    item: string;
    onHandleAction?: (text: string) => void
}) => {
    const onPress = useCallback(() => {
        onHandleAction && onHandleAction(item)
    },[onHandleAction])

    return (
        <TouchableOpacity onPress={onPress}>
            <SubTitleContact>{item}</SubTitleContact>
        </TouchableOpacity>
    )
}

const ContactDetailScreen = () => {
    const navigation = useNavigation<any>();
    const params = useRoute<any>()
    console.log(params?.params)

    const item: ContactInformation = useContact(params?.params?.id)

    const [modal, setModal] = React.useState<string>('');
    const [heightHeader,setHeightHeader] = useState(0)

    const [dataModal, setDataModal] = React.useState<Array<string> | undefined>();

    const onNavToEmail = useCallback( async (email: string) => {
        await Linking.openURL(`mailto:${email}`)
    },[])

    const onNavToCall = useCallback( async (phone: string) => {
        await Linking.openURL(`tel:${phone}`)
    },[])

    const buttonList = [
        {
            icon: ICONS.call,
            title: 'Nhấn gọi điện',
            disable: item?.phoneNumberList.length > 0 ? false : true,
            onPress: () => {
                setDataModal(item?.phoneNumberList);
                setModal('Call')
            },
        },
        {
            icon: ICONS.chat_bubble,
            title: 'Nhắn tin',
            disable: item?.phoneNumberList.length > 0 ? false : true,
            onPress: () => {
                setDataModal(item?.phoneNumberList);
                setModal('Message')
            },
        },
        {
            icon: ICONS.video_call,
            title: 'Facetime',
            disable: item?.phoneNumberList.length > 0 ? false : true,
            onPress: () => {},
        },
        {
            icon: ICONS.email,
            title: 'Gửi email',
            disable: item?.emailList.length > 0 ? false : true,
            onPress: () => {
                setDataModal(item?.emailList);
                setModal('Email')
            },
        }
    ]

    const onLayout = useCallback((nativeEvent: LayoutChangeEvent ) => {
        setHeightHeader(nativeEvent.nativeEvent.layout.height)
    },[])

    return (
            <Container>
                <CustomModal modal={modal} setModal={setModal} dataModal={dataModal}/>
                <View onLayout={onLayout}>
                    <Header
                        backgroundColor={'#F2A54A10'}
                        renderLeftButton={() => (
                            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                                <BackIcon source={ICONS.arrow_back}/>
                            </TouchableOpacity>)}
                        renderRightButton={() => (
                            <TouchableOpacity onPress={() => navigation.navigate('Create_contact',{item})}>
                                <TextButtonHeader>Sửa</TextButtonHeader>
                            </TouchableOpacity>
                        )}
                    />
                </View>
                <HeaderView top={heightHeader}/>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{flex: 1,backgroundColor: '#ffffff'}}
                    data={[{}]}
                    renderItem={() => <View/>}
                    ListHeaderComponent={
                        <WrapHeaderItem>
                            <Avatar source={item?.avatar}/>
                            <WrapTitleHeader>
                                <CustomTitleHeaderItem>{item?.value ?? ''}</CustomTitleHeaderItem>
                                <CustomSubTitleHeaderItem>UI/UX Design</CustomSubTitleHeaderItem>
                            </WrapTitleHeader>
                            <WrapButtonContainer>
                                {buttonList.map((button,index) => (
                                    <CustomButton
                                        key={index}
                                        {...button}
                                    />
                                ))}
                            </WrapButtonContainer>
                        </WrapHeaderItem>
                    }
                    ListFooterComponent={(
                        <>
                            <CustomContactItem>
                                <TitleContact>Điện thoại</TitleContact>
                                <View>{
                                    item?.phoneNumberList && item.phoneNumberList.length > 0 && (
                                        item?.phoneNumberList.map((phone,index) => (
                                            <CustomTextButton
                                                key={index}
                                                item={phone}
                                                onHandleAction={onNavToCall}
                                            />
                                        ))
                                    )
                                }</View>
                            </CustomContactItem>
                            <CustomEmailItem>
                                <TitleContact>Email</TitleContact>
                                <View>{
                                    item?.emailList && item.emailList.length > 0 && (
                                        item?.emailList.map((email,index) => (
                                            <CustomTextButton
                                                key={index}
                                                item={email}
                                                onHandleAction={onNavToEmail}
                                            />
                                        ))
                                    )
                                }</View>
                            </CustomEmailItem>
                            <CustomNoteItem>
                                <TitleContact>Ghi chú</TitleContact>
                            </CustomNoteItem>
                            <CustomContactButton>
                                <TouchableOpacity onPress={() => {
                                    setDataModal(item?.phoneNumberList);
                                    setModal('Message')
                                }}>
                                    <CustomTitleButtonBody>Gửi tin nhắn</CustomTitleButtonBody>
                                </TouchableOpacity>
                            </CustomContactButton>
                            <CustomContactButton>
                                <TouchableOpacity onPress={() => {
                                    removeContactAction(item)
                                    navigation.navigate('Home')
                                }}>
                                    <CustomTitleDeleteButton>Xoá người gọi</CustomTitleDeleteButton>
                                </TouchableOpacity>
                            </CustomContactButton>
                        </>
                    )}
                />
            </Container>
    )
}

export default ContactDetailScreen;
