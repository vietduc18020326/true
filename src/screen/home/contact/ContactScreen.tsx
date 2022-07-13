import React, {useCallback, useMemo, useState} from 'react'
// @ts-ignore
import styled from "styled-components/native";
import {Text, TouchableOpacity, Dimensions, TextInput, KeyboardAvoidingView, Platform} from 'react-native'
import { AlphabetList } from 'react-native-section-alphabet-list'

import Container from "../../components/Container";
import Header from '../../components/Header'
import {AVATAR_DEFAULT, CAMERA, MORE, SEARCH} from "../../../assets";
import {useContactById, useContactIdList} from "../../../store/contact";
import {removeVietnameseTones} from "../../../utils/string";
import {navigateToContactDetailScreen, navigateToCreateContactScreen, openDrawer} from "../../../utils/navigation";
import {Colors} from "../../../themes/Colors";

const Icon = styled.Image`
  width: 24px;
  height: 24px;
`

const CustomTextInput = styled.View`
  width: 95%;
  height: 36px;
  background-color: rgba(242, 242, 242, 0.5);
  border-radius: 6px;
  flex-direction: row;
  align-self: center;
  margin-top: 10px;
  margin-bottom: 10px;
`

const WrapSearchIcon = styled.View`
  width: 40px;
  height: 100%;
  justify-content: center;
  align-items: center;
`

const SearchIcon = styled.Image`
  width: 16px;
  height: 16px;
`

const CustomSectionHeader = styled.View`
  width: 100%;
  height: 36px;
  background-color: ${Colors.white};
  justify-content: center;
  padding-left: 16px;
`

const BackgroundSectionHeader = styled.View`
  background-color: ${Colors.chineseWhite};
  opacity: 0.5;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`

const TitleHeader = styled.Text`
  font-weight: 500;
  font-size: 15px;
  line-height: 16px;
  letter-spacing: 0.12px;
  color: ${Colors.darkCharcoal};
`

const CustomItem = styled.TouchableOpacity`
  height: 64px;
  width: ${Dimensions.get('screen').width - 30}px;
  flex-direction: row;
`

const WrapAvatar = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`

const WrapInfo = styled.View`
  flex: 4;
  justify-content: center;
  border-bottom-color: ${Colors.black10};
  border-bottom-width: 1px;
`

const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 50px;
`

const AvatarDefault = styled.Image`
  width: 34px;
  height: 34px;
`

const WrapAvatarDefault = styled.View`
  width: 40px;
  height: 40px;
  background-color: ${Colors.anti_flashWhite};
  border-radius: 50px;
  justify-content: center;
  align-items: center;
`

const NameText = styled.Text`
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0.12px;
  color: ${Colors.darkCharcoal};
  margin-bottom: 5px;
`

const PhoneNumberText = styled.Text`
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.12px;
  color: ${Colors.oldSilver};
`

const ContactScreen = () => {
    const [textSearch, setTextSearch] = useState('')
    const contactsId: any = useContactIdList();

    const Ids = useMemo(() => {
        let _Ids = contactsId;

        if(textSearch !== '') {
            _Ids = _Ids.filter((d: any) => removeVietnameseTones(d.value).toUpperCase().includes(removeVietnameseTones(textSearch).toUpperCase()))
        }

        return _Ids;
    },[textSearch,contactsId])

    const onNavToContactDetailScreen = React.useCallback((id: any) => {
        navigateToContactDetailScreen({id: id.key})
    },[navigateToContactDetailScreen])

    const onNavToCreateContactScreen = React.useCallback(() => {
        navigateToCreateContactScreen()
    },[navigateToCreateContactScreen])

    const renderCustomItem = useCallback((id: any) => {
        const item = useContactById(id.key)

        const onPress = () => {
            onNavToContactDetailScreen(id);
        }

        return (
            <CustomItem onPress={onPress}>
                <WrapAvatar>
                    {item?.avatar ? <Avatar source={item.avatar}/> : (
                        <WrapAvatarDefault>
                            <AvatarDefault source={AVATAR_DEFAULT}/>
                        </WrapAvatarDefault>
                    )}
                </WrapAvatar>
                <WrapInfo>
                    <NameText>{item?.value !== '' ? item?.value : 'Không có tên'}</NameText>
                    <PhoneNumberText numberOfLines={1}>
                        {item?.phoneNumberList && item.phoneNumberList.length > 0 ? item.phoneNumberList.map((phone: string,index: number) => (
                            <Text key={index}>
                                {phone} {' '}
                            </Text>
                        )) : 'Không có số điện thoại'}
                    </PhoneNumberText>
                </WrapInfo>
            </CustomItem>
        )
    },[])

    return (
        <Container>
            <Header
                title={'Liên hệ'}
                renderLeftButton={() => (
                    <TouchableOpacity onPress={openDrawer}>
                        <Icon source={MORE} resizeMode={'stretch'}/>
                    </TouchableOpacity>
                )}
                renderRightButton={() => (
                    <TouchableOpacity onPress={onNavToCreateContactScreen}>
                        <Icon source={CAMERA} resizeMode={'stretch'}/>
                    </TouchableOpacity>
                )}/>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{flex: 1}}
            >
                <CustomTextInput>
                    <WrapSearchIcon>
                        <SearchIcon source={SEARCH}/>
                    </WrapSearchIcon>
                    <TextInput
                        style={{flex: 1, opacity: 0.5, color: '#333333'}}
                        placeholder="Tìm kiếm danh bạ"
                        placeholderTextColor="#BDBDBD"
                        underlineColorAndroid="transparent"
                        value={textSearch}
                        onChangeText={(text: string) => setTextSearch(text)}
                    />
                </CustomTextInput>
                <AlphabetList
                    uncategorizedAtTop
                    data={Ids ?? []}
                    style={{flex: 1}}
                    renderCustomItem={renderCustomItem}
                    renderCustomSectionHeader={(section) => (
                        <CustomSectionHeader>
                            <BackgroundSectionHeader />
                            <TitleHeader>{section.title}</TitleHeader>
                        </CustomSectionHeader>
                    )}
                    index={customIndex}
                    indexLetterStyle={{
                        color: Colors.yellowOrange,
                        fontWeight: '400',
                        fontSize: 13,
                        lineHeight: 22,
                        letterSpacing: 0.12,
                    }}
                    indexLetterContainerStyle={{
                        marginBottom: 0,
                        width: 20,
                        height: 25,
                    }}
                    letterListContainerStyle={{
                        justifyContent: 'center',
                        paddingTop: 8,
                    }}
                    indexContainerStyle={{
                        width: 30,
                    }}
                />
            </KeyboardAvoidingView>
        </Container>
    );
};

const customIndex: Array<string> = [
    'a',
    'ă',
    'â',
    'b',
    'c',
    'd',
    'đ',
    'e',
    'ê',
    'f',
    'j',
    'g',
    'h',
    'i',
    'k',
    'l',
    'm',
    'n',
    'o',
    'ô',
    'ơ',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'ư',
    'v',
    'x',
    'w',
    'y',
    'z',
];

export default ContactScreen;
