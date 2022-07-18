import React, {memo, useCallback, useEffect, useState} from 'react';
import {
  TouchableOpacity,
  Linking,
  LayoutChangeEvent,
  View,
  FlatList,
  Alert,
} from 'react-native';
import styled from 'styled-components/native';
import Container from '@/screen/components/Container';
import Header from '@/screen/components/Header';
import {ARROW_BACK} from '@/assets';
import {removeContactAction} from '@/store/contact/indexv3';
import {ContactDetailScreenProps, ContactInformation} from '@/type';
import CustomModal from '@/screen/components/Modal';
import {
  navigateToContactScreen,
  navigateToCreateContactScreen,
} from '@/utils/navigation';
import {Colors} from '@/themes/Colors';
import {useNavigationParams} from '@/hooks/useNavigationParams';
import {removeContact, useContact, useContactId} from '@/store/contact';
import CustomHeaderItem from '@/screen/home/contact_detail/components/CustomHeaderItem';
import CustomFooterItem from '@/screen/home/contact_detail/components/CustomFooterItem';
import {BaseStyles} from '@/themes/BaseStyles';

const BackIcon = styled.Image`
  width: 28px;
  height: 28px;
`;

const TextButtonHeader = styled.Text`
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: -0.41px;
  color: ${Colors.yellowOrange};
`;

const HeaderView = styled.View<{top: number}>`
  position: absolute;
  top: ${(p: {top: any}) => p.top}px;
  left: 0;
  bottom: 300px;
  right: 0;
  background-color: ${Colors.yellowOrange10};
`;

const ContactDetailScreen = () => {
  const params = useNavigationParams<ContactDetailScreenProps>();

  const [contactId, setContactId] = useState('0');

  useEffect(() => {
    if (params?.id) {
      setContactId(params?.id);
    } else {
      setContactId('0');
    }
  }, [params?.id]);

  const item: ContactInformation | undefined = useContact(contactId);
  const ids = useContactId('all');

  const [modal, setModal] = React.useState<string>('');
  const [heightHeader, setHeightHeader] = useState(0);

  const [dataModal, setDataModal] = React.useState<Array<string> | undefined>();

  const onNavToEmail = useCallback(async (email: string) => {
    await Linking.openURL(`mailto:${email}`);
  }, []);

  const onNavToCall = useCallback(async (phone: string) => {
    await Linking.openURL(`tel:${phone}`);
  }, []);

  const onOpenModalMessage = useCallback(() => {
    setDataModal(item?.phoneNumberList);
    setModal('Message');
  }, []);

  const onNavToCreateContactScreen = useCallback(() => {
    navigateToCreateContactScreen({
      item,
      id: contactId,
    });
  }, [navigateToCreateContactScreen, item, contactId]);

  const onNavToContactScreen = useCallback(() => {
    navigateToContactScreen();
  }, [navigateToContactScreen]);

  const onLayout = useCallback((nativeEvent: LayoutChangeEvent) => {
    setHeightHeader(nativeEvent.nativeEvent.layout.height);
  }, []);

  const onRemoveContact = useCallback(() => {
    Alert.alert('Xoá liên hệ', 'Bạn có chắc chắn muốn xoá liên hệ', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          removeContact(contactId, ids);
          navigateToContactScreen();
        },
      },
    ]);
  }, [removeContactAction, navigateToContactScreen, contactId, ids]);

  const renderListHeader = useCallback(
    () => (
      <CustomHeaderItem
        item={item}
        setDataModal={setDataModal}
        setModal={setModal}
        onNavToCall={onNavToCall}
        onNavToEmail={onNavToEmail}
      />
    ),
    [item, onNavToCall, onNavToEmail],
  );

  const renderListFooter = useCallback(
    () => (
      <CustomFooterItem
        item={item}
        onOpenModalMessage={onOpenModalMessage}
        onNavToCall={onNavToCall}
        onNavToEmail={onNavToEmail}
        onRemoveContact={onRemoveContact}
      />
    ),
    [item, onRemoveContact, onOpenModalMessage, onNavToCall, onNavToEmail],
  );

  const renderLeftButton = useCallback(
    () => (
      <TouchableOpacity onPress={onNavToContactScreen}>
        <BackIcon source={ARROW_BACK} />
      </TouchableOpacity>
    ),
    [onNavToContactScreen],
  );

  const renderRightButton = useCallback(
    () => (
      <TouchableOpacity onPress={onNavToCreateContactScreen}>
        <TextButtonHeader>Sửa</TextButtonHeader>
      </TouchableOpacity>
    ),
    [onNavToCreateContactScreen],
  );

  return (
    <Container>
      <CustomModal modal={modal} setModal={setModal} dataModal={dataModal} />
      <View onLayout={onLayout}>
        <Header
          backgroundColor={Colors.yellowOrange10}
          renderLeftButton={renderLeftButton}
          renderRightButton={renderRightButton}
        />
      </View>
      <HeaderView top={heightHeader} />
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={BaseStyles.bgWhiteFlex1}
        data={[]}
        renderItem={() => <View />}
        ListHeaderComponent={renderListHeader}
        ListFooterComponent={renderListFooter}
      />
    </Container>
  );
};

export default memo(ContactDetailScreen);
