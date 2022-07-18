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
  InteractionManager,
} from 'react-native';
import Container from '@/screen/components/Container';
import Header from '@/screen/components/Header';
import Avatar from '@/screen/components/Avatar';
import CustomButtonListContainer from '@/screen/home/create_contact/components/CustomButtonListContainer';
import CustomTextInputList from '@/screen/home/create_contact/components/CustomTextInputList';
import {updateContactAction} from '@/store/contact/indexv3';
import {ContactInformation, CreateContactScreenProps} from '@/type';
import {goBack, navigateToContactDetailScreen, reset} from '@/utils/navigation';
import {Colors} from '@/themes/Colors';
import {useNavigationParams} from '@/hooks/useNavigationParams';
import {BaseStyles} from '@/themes/BaseStyles';
import {updateAllContacts, useContactId} from '@/store/contact';

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

const renderItem = ({item}: any) => <View />;

const CreateContactScreen = () => {
  const params = useNavigationParams<CreateContactScreenProps>();

  const ids = useContactId('all');

  const {item: itemDefault, id} = params || {};

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

      // updateContactAction(newItem, id ?? newItem.id);
      updateAllContacts([newItem], ids);
      InteractionManager.runAfterInteractions(() => {
        setTimeout(() => {
          reset();
          navigateToContactDetailScreen({id: id ?? newItem.id});
        }, 500);
      });
    }
  }, [item, updateContactAction, navigateToContactDetailScreen, reset, ids]);

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
  //         <CustomTextInputList item={item} setItem={setItem} />
  //         <CustomButtonListContainer
  //           itemDefault={itemDefault}
  //           setItem={setItem}
  //         />
  //       </WrapBody>
  //     </>
  //   ),
  //   [item, itemDefault],
  // );
  const ListFooterComponent = useMemo(() => {
    return (
      <>
        <WrapAvatarContainer>
          <Avatar isButton source={item.avatar} setData={setItem} />
        </WrapAvatarContainer>
        <WrapBody>
          <CustomTextInputList item={item} setItem={setItem} />
          <CustomButtonListContainer
            itemDefault={itemDefault}
            setItem={setItem}
          />
        </WrapBody>
      </>
    );
  }, []);

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
            renderItem={renderItem}
            ListFooterComponent={ListFooterComponent}
          />
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default memo(CreateContactScreen);
