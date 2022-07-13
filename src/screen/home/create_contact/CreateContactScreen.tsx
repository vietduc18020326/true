import React, {useCallback, useEffect, useState} from 'react'
// @ts-ignore
import styled from "styled-components/native";
import {useNavigation, useRoute} from "@react-navigation/native";
import {
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    FlatList,
    View,
    KeyboardTypeOptions, InteractionManager, Alert
} from "react-native";

import Container from "../../components/Container";
import Header from '../../components/Header'
import Avatar from "../../components/Avatar";
import CustomButtonListContainer from "./components/button_list";
import {updateContactAction} from "../../../store/contact";
import {ContactInformation} from "../../../type";
import {useContactIdList} from "../../../store/contact";
import {goBack, navigateToContactDetailScreen, reset} from "../../../utils/navigation";
import {Colors} from "../../../themes/Colors";

const CustomTitleLeftButton = styled.Text`
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: -0.41px;
  color: ${Colors.yellowOrange};
`

const CustomTitleRightButton = styled(CustomTitleLeftButton)`
  color: ${Colors.oldSilver};
`

const WrapAvatarContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`

const WrapBody = styled.View`
  flex: 4;
  align-items: center;
`

const WrapTextInput = styled.View`
  width: 100%;
  margin-bottom: 24px;
  align-items: center;
`

const CustomTextInput = styled.TextInput`
  width: 90%;
  height: 44px;
  border-bottom-width: 0.5px;
  border-bottom-color: ${Colors.black10};
  font-weight: 400;
  font-size: 15px;
  line-height: 22px;
  letter-spacing: -0.41px;
  color: ${Colors.darkCharcoal};
`

const WrapButton = styled.View`
  height: 44px;
  width: 90%;
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.black10};
  justify-content: center;
`

const CustomButton = styled.TouchableOpacity`
  flex-direction: row;
`

const CustomTitleButton = styled.Text`
  font-size: 15px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: -0.41px;
  color: ${Colors.darkCharcoal};
`

const Icon = styled.Image`
  width: 24px;
  height: 24px;
  margin-right: 24px;
`

interface ButtonList {
    title: string;
    keyName: string;
    data: string | Array<string>;
    keyboardType?: KeyboardTypeOptions;
    label?: string;
}

const CreateContactScreen = () => {
    const navigation = useNavigation<any>();
    const params = useRoute<any>();
    const itemDefault = params?.params?.item;
    const id = params?.params?.id;

    const contactIdList: any = useContactIdList();

    const [item,setItem] = useState<ContactInformation>({
        value: '',
        id: new Date().getTime().toString(),
        avatar: null,
        firstName: '',
        lastName: '',
        company: '',
        phoneNumberList: [],
        emailList: [],
        addressList: [],
        birthday: ''
    })

    useEffect(() => {
        if(params?.params?.item){
            setItem(params?.params?.item)
        }
    },[])


    const textInputList = [
        {label: 'Họ', keyName: 'lastName'},
        {label: 'Tên', keyName: 'firstName'},
        {label: 'Công ty', keyName: 'company'}
    ]

    const buttonList: Array<ButtonList>  = [
        {
            title: 'thêm số điện thoại',
            label: 'số điện thoại',
            keyName: 'phoneNumberList',
            data: itemDefault?.phoneNumberList || [],
            keyboardType: "numeric"
        },
        {
            title: 'thêm email',
            label: 'email',
            keyName: 'emailList',
            data: itemDefault?.emailList || [],
            keyboardType: 'email-address'
        },
        {
            title: 'thêm địa chỉ',
            label: 'địa chỉ',
            keyName: 'addressList',
            data: itemDefault?.addressList || [],
            keyboardType: 'default'
        },
        {
            title: 'thêm ngày sinh',
            keyName: 'birthday',
            data: itemDefault?.birthday || '',
        },
    ]

    const onHandleContact = useCallback(() => {
        if(item) {
            const spaceText = item.firstName !== '' && item.lastName !== '' ? ' ' : ''
            const newItem = {
                ...item,
                value: item.firstName + spaceText + item.lastName,
                phoneNumberList: item.phoneNumberList.filter((phone) => phone !== ''),
                emailList: item.emailList.filter((email) => email !== ''),
                addressList: item.addressList.filter((address) => address !== ''),
            }

            updateContactAction(newItem,id ?? newItem.id)
            InteractionManager.runAfterInteractions(() => {
                setTimeout(() => {
                    reset();
                    navigateToContactDetailScreen({id: id ?? newItem.id})
                }, 1000)
            })
        }

    }, [navigation,item,updateContactAction,navigateToContactDetailScreen,reset])

    return (
        <Container>
            <Header
                renderLeftButton={() => (
                    <TouchableOpacity onPress={goBack}>
                        <CustomTitleLeftButton>Huỷ</CustomTitleLeftButton>
                    </TouchableOpacity>
                )}
                renderRightButton={() => (
                    <TouchableOpacity onPress={onHandleContact}>
                        <CustomTitleRightButton>Xong</CustomTitleRightButton>
                    </TouchableOpacity>
                )}/>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={10}
                style={{flex: 1}}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <FlatList
                        data={[{}]}
                        renderItem={() => <View/>}
                        ListFooterComponent={
                        <>
                            <WrapAvatarContainer>
                                <Avatar isButton source={item.avatar} setData={setItem}/>
                            </WrapAvatarContainer>
                            <WrapBody>
                                <WrapTextInput>
                                    {textInputList.map((value,index) => (
                                            <CustomTextInput
                                                autoFocus={index === 0}
                                                key={index}
                                                placeholder={value.label}
                                                value={item[value.keyName as keyof ContactInformation]}
                                                onChangeText={(text: string) => {
                                                    const newItem = {
                                                        ...item,
                                                        [value.keyName]: text,
                                                    }
                                                    setItem(newItem)
                                                }}
                                                placeholderTextColor={'#BDBDBD'}
                                            />
                                    ))}
                                </WrapTextInput>
                                {buttonList.map((b,index) => (
                                    <CustomButtonListContainer
                                        key={index}
                                        setData={setItem}
                                        {...b}
                                    />
                                ))}
                            </WrapBody>
                        </>
                        }
                    />
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </Container>
    );
}

export default CreateContactScreen;
