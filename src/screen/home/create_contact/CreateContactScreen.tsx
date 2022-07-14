import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import styled from 'styled-components/native';
import {
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  View,
  KeyboardTypeOptions,
  InteractionManager,
} from 'react-native';
import Container from '@/screen/components/Container';
import Header from '@/screen/components/Header';
import Avatar from '@/screen/components/Avatar';
import CustomButtonListContainer from './components/button_list';
import CustomTextInput from './components/CustomTextInput';
import {updateContactAction} from '@/store/contact';
import {ContactInformation, CreateContactScreenProps} from '@/type';
import {goBack, navigateToContactDetailScreen, reset} from '@/utils/navigation';
import {Colors} from '@/themes/Colors';
import {useNavigationParams} from '@/hooks/useNavigationParams';
import {BaseStyles} from '@/themes/BaseStyles';

const CustomTitleLeftButton = styled.Text`
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: -0.41px;
  color: ${Colors.yellowOrange};
`;

const CustomTitleRightButton = styled(CustomTitleLeftButton)`
  color: ${Colors.oldSilver};
`;

const WrapAvatarContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const WrapBody = styled.View`
  flex: 4;
  align-items: center;
`;

const WrapTextInput = styled.View`
  width: 100%;
  margin-bottom: 24px;
  align-items: center;
`;

interface ButtonList {
  title: string;
  keyName: string;
  data: string | Array<string>;
  keyboardType?: KeyboardTypeOptions;
  label?: string;
}

const textInputList = [
  {label: 'Họ', keyName: 'lastName'},
  {label: 'Tên', keyName: 'firstName'},
  {label: 'Công ty', keyName: 'company'},
];

const CreateContactScreen = () => {
  const params = useNavigationParams<CreateContactScreenProps>();

  const itemDefault = params?.item;
  const id = params?.id;

  const [item, setItem] = useState<ContactInformation>({
    value: '',
    id: new Date().getTime().toString(),
    avatar: null,
    firstName: '',
    lastName: '',
    company: '',
    phoneNumberList: [],
    emailList: [],
    addressList: [],
    birthday: '',
  });

  useEffect(() => {
    if (itemDefault) {
      setItem(itemDefault);
    }
  }, []);

  const buttonList: Array<ButtonList> = useMemo(() => {
    return [
      {
        title: 'thêm số điện thoại',
        label: 'số điện thoại',
        keyName: 'phoneNumberList',
        data: itemDefault?.phoneNumberList || [],
        keyboardType: 'numeric',
      },
      {
        title: 'thêm email',
        label: 'email',
        keyName: 'emailList',
        data: itemDefault?.emailList || [],
        keyboardType: 'email-address',
      },
      {
        title: 'thêm địa chỉ',
        label: 'địa chỉ',
        keyName: 'addressList',
        data: itemDefault?.addressList || [],
        keyboardType: 'default',
      },
      {
        title: 'thêm ngày sinh',
        keyName: 'birthday',
        data: itemDefault?.birthday || '',
      },
    ];
  }, [itemDefault]);

  const onHandleContact = useCallback(() => {
    if (item) {
      const spaceText =
        item.firstName.trim() !== '' && item.lastName.trim() !== '' ? ' ' : '';
      const newItem = {
        ...item,
        value: item.firstName.trim() + spaceText + item.lastName.trim(),
        phoneNumberList: item.phoneNumberList.filter(Boolean),
        emailList: item.emailList.filter(Boolean),
        addressList: item.addressList.filter(Boolean),
      };

      updateContactAction(newItem, id ?? newItem.id);
      InteractionManager.runAfterInteractions(() => {
        setTimeout(() => {
          reset();
          navigateToContactDetailScreen({id: id ?? newItem.id});
        }, 500);
      });
    }
  }, [item, updateContactAction, navigateToContactDetailScreen, reset]);

  const renderLeftButton = useCallback(
    () => (
      <TouchableOpacity onPress={goBack}>
        <CustomTitleLeftButton>Huỷ</CustomTitleLeftButton>
      </TouchableOpacity>
    ),
    [goBack],
  );

  const renderRightButton = useCallback(
    () => (
      <TouchableOpacity onPress={onHandleContact}>
        <CustomTitleRightButton>Xong</CustomTitleRightButton>
      </TouchableOpacity>
    ),
    [onHandleContact],
  );

  // const renderListFooterComponent = useCallback(
  //   () => (
  //     <>
  //       <WrapAvatarContainer>
  //         <Avatar isButton source={item.avatar} setData={setItem} />
  //       </WrapAvatarContainer>
  //       <WrapBody>
  //         <WrapTextInput>
  //           {textInputList.map((value, index) => (
  //             <CustomTextInput
  //               autoFocus={index === 0}
  //               key={index}
  //               placeholder={value.label}
  //               value={item[value.keyName as keyof ContactInformation]}
  //               keyName={value.keyName}
  //               item={item}
  //               setItem={setItem}
  //               placeholderTextColor={Colors.gray}
  //             />
  //           ))}
  //         </WrapTextInput>
  //         {buttonList.map((b, index) => (
  //           <CustomButtonListContainer key={index} setData={setItem} {...b} />
  //         ))}
  //       </WrapBody>
  //     </>
  //   ),
  //   [setItem, item, buttonList],
  // );

  return (
    <Container>
      <Header
        renderLeftButton={renderLeftButton}
        renderRightButton={renderRightButton}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={10}
        style={BaseStyles.flex1}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            data={[{}]}
            renderItem={() => <View />}
            ListFooterComponent={
              <>
                <WrapAvatarContainer>
                  <Avatar isButton source={item.avatar} setData={setItem} />
                </WrapAvatarContainer>
                <WrapBody>
                  <WrapTextInput>
                    {textInputList.map((value, index) => (
                      <CustomTextInput
                        autoFocus={index === 0}
                        key={index}
                        placeholder={value.label}
                        value={item[value.keyName as keyof ContactInformation]}
                        keyName={value.keyName}
                        item={item}
                        setItem={setItem}
                        placeholderTextColor={Colors.gray}
                      />
                    ))}
                  </WrapTextInput>
                  {buttonList.map((b, index) => (
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
};

export default memo(CreateContactScreen);
