import React, {useCallback, useMemo, useState, memo} from 'react';
// @ts-ignore
import styled from 'styled-components/native';
import {TouchableOpacity, KeyboardAvoidingView, Platform} from 'react-native';

import Container from '@/screen/components/Container';
import Header from '@/screen/components/Header';
import {CAMERA, MORE, SEARCH} from '@/assets';
import {useContactIdList} from '@/store/contact';
import {removeVietnameseTones} from '@/utils/string';
import {
  navigateToCreateContactScreen,
  openDrawer,
} from '@/utils/navigation';
import {Colors} from '@/themes/Colors';
import {ContactIdListProps} from '@/type';
import CustomAlphabetList from './CustomAlphabetList';
import {BaseStyles} from "@/themes/BaseStyles";

const Icon = styled.Image`
  width: 24px;
  height: 24px;
`;

const CustomTextInput = styled.View`
  width: 95%;
  height: 36px;
  background-color: rgba(242, 242, 242, 0.5);
  border-radius: 6px;
  flex-direction: row;
  align-self: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const WrapSearchIcon = styled.View`
  width: 40px;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const SearchIcon = styled.Image`
  width: 16px;
  height: 16px;
`;

const InputSearch = styled.TextInput`
  flex: 1;
  opacity: 0.5;
  color: ${Colors.darkCharcoal};
`;

const ContactScreen = () => {
  const [textSearch, setTextSearch] = useState('');
  const contactIds: ContactIdListProps[] = useContactIdList();

  const ids = useMemo(() => {
    let _ids = contactIds;

    if (textSearch !== '') {
      _ids = _ids.filter((d: any) =>
        removeVietnameseTones(d.value)
          .toUpperCase()
          .includes(removeVietnameseTones(textSearch).toUpperCase()),
      );
    }

    return _ids;
  }, [textSearch, contactIds]);

  const onNavToCreateContactScreen = useCallback(() => {
    navigateToCreateContactScreen();
  }, [navigateToCreateContactScreen]);

  const onChangeText = useCallback((text: string) => setTextSearch(text), []);

  const renderLeftButton = useCallback(() => {
    return (
      <TouchableOpacity onPress={openDrawer}>
        <Icon source={MORE} resizeMode={'stretch'} />
      </TouchableOpacity>
    );
  }, [openDrawer]);

  const renderRightButton = useCallback(
      () => (
          <TouchableOpacity onPress={onNavToCreateContactScreen}>
            <Icon source={CAMERA} resizeMode={'stretch'} />
          </TouchableOpacity>
      ),
      [onNavToCreateContactScreen],
  );


  return (
    <Container>
      <Header
        title={'Liên hệ'}
        renderLeftButton={renderLeftButton}
        renderRightButton={renderRightButton}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={BaseStyles.flex1}>
        <CustomTextInput>
          <WrapSearchIcon>
            <SearchIcon source={SEARCH} />
          </WrapSearchIcon>
          <InputSearch
            placeholder="Tìm kiếm danh bạ"
            placeholderTextColor={Colors.gray}
            underlineColorAndroid={Colors.transparent}
            value={textSearch}
            onChangeText={onChangeText}
          />
        </CustomTextInput>
        <CustomAlphabetList ids={ids} />
      </KeyboardAvoidingView>
    </Container>
  );
};

export default memo(ContactScreen);
