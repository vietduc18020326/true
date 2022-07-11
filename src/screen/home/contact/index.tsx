import React, {useCallback, useMemo, useState} from 'react'
// @ts-ignore
import styled from "styled-components/native";
import {Text, TouchableOpacity,View, Dimensions, TextInput, KeyboardAvoidingView, Platform} from 'react-native'
import { AlphabetList } from 'react-native-section-alphabet-list'
import {useNavigation} from "@react-navigation/native";
import {getBottomSpace} from "react-native-iphone-x-helper";

import Container from "../../components/Container";
import Header from '../../components/Header'
import {ICONS,IMAGES} from "../../../assets";
import {useContactList,useContact} from "../../../store";

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
  background-color: white;
  justify-content: center;
  padding-left: 16px;
`

const BackgroundSectionHeader = styled.View`
  background-color: #E0E0E0;
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
  color: #333333;
`

const CustomItem = styled.TouchableOpacity<{width: number}>`
  height: 64px;
  width: ${(p: { width: number; }) => (p.width - 30)}px;
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
  border-bottom-color: #00000016;
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
  background-color: #F2F2F2;
  border-radius: 50px;
  justify-content: center;
  align-items: center;
`

const NameText = styled.Text`
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0.12px;
  color: #333333;
  margin-bottom: 5px;
`

const PhoneNumberText = styled.Text`
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.12px;
  color: #828282;
`


const ContactScreen = () => {
    const navigation = useNavigation<any>();
    const contactsId: any = useContactList();

    const [textSearch, setTextSearch] = useState('')

    console.log(contactsId)

    const data = useMemo(() => {
        let _data = contactsId ? contactsId.map((contact: any) => ({
            ...contactsId,
            key: contactsId
        })) : []
        //
        // if(textSearch !== '') {
        //     _data = _data.filter((d: any) => d.value.toUpperCase().includes(textSearch.toUpperCase()))
        // }

        return [];
    },[contactsId,textSearch])

    const onNavToContactDetailScreen = React.useCallback((id: any) => {
        navigation.navigate('Contact_detail',{id: id.key})
    },[navigation])

    const renderCustomItem = useCallback((id: any) => {
        const item = useContact(id.key)

        const onPress = () => {
            onNavToContactDetailScreen(id);
        }

        return (
            <CustomItem width={Dimensions.get('screen').width} onPress={onPress}>
                <WrapAvatar>
                    {item?.avatar ? <Avatar source={item.avatar}/> : (
                        <WrapAvatarDefault>
                            <AvatarDefault source={ICONS.avatar_default}/>
                        </WrapAvatarDefault>
                    )}
                </WrapAvatar>
                <WrapInfo>
                    <NameText>{item?.value ?? ''}</NameText>
                    <PhoneNumberText numberOfLines={1}>
                        {item?.phoneNumberList && item.phoneNumberList.length > 0 && item.phoneNumberList.map((phone: string,index: number) => (
                            <Text key={index}>
                                {phone} {' '}
                            </Text>
                        ))}
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
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Icon source={ICONS.more} resizeMode={'stretch'}/>
                    </TouchableOpacity>
                )}
                renderRightButton={() => (
                    <TouchableOpacity onPress={() => navigation.navigate('Create_contact')}>
                        <Icon source={ICONS.camera} resizeMode={'stretch'}/>
                    </TouchableOpacity>
                )}/>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{flex: 1}}
            >
                <CustomTextInput>
                    <WrapSearchIcon>
                        <SearchIcon source={ICONS.search}/>
                    </WrapSearchIcon>
                    <TextInput
                        style={{flex: 1, opacity: 0.5}}
                        placeholder="Tìm kiếm danh bạ"
                        placeholderTextColor="#BDBDBD"
                        underlineColorAndroid="transparent"
                        value={textSearch}
                        onChangeText={(text: string) => setTextSearch(text)}
                    />
                </CustomTextInput>
                <AlphabetList
                    uncategorizedAtTop
                    data={contactsId ?? []}
                    style={{paddingBottom: getBottomSpace() + 22}}
                    renderCustomItem={renderCustomItem}
                    renderCustomSectionHeader={(section) => (
                        <CustomSectionHeader>
                            <BackgroundSectionHeader />
                            <TitleHeader>{section.title}</TitleHeader>
                        </CustomSectionHeader>
                    )}
                    indexLetterStyle={{
                        color: '#F2A54A',
                        fontWeight: '400',
                        fontSize: 13,
                        lineHeight: 22,
                        letterSpacing: 0.12,
                    }}
                    indexLetterContainerStyle={{
                        marginBottom: 0,
                        width: 20,
                        height: 25
                    }}
                    letterListContainerStyle={{
                        justifyContent: 'flex-start',
                        paddingTop: 8,
                    }}
                    indexContainerStyle={{
                        width: 30,
                    }}
                />
            </KeyboardAvoidingView>
        </Container>
    );
}

export default ContactScreen;
