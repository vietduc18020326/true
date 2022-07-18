import React, {memo, useCallback} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {ContactInformation} from '@/type';
import styled from 'styled-components/native';
import {Colors} from '@/themes/Colors';

const CustomContactItem = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.black10};
  margin-left: 16px;
  margin-right: 16px;
  margin-bottom: 8px;
  padding-top: 8px;
  padding-bottom: 8px;
`;

const CustomEmailItem = styled(CustomContactItem)`
  margin-bottom: 24px;
`;

const CustomNoteItem = styled(CustomContactItem)`
  margin-bottom: 0;
  height: 64px;
`;

const CustomContactButton = styled(CustomContactItem)`
  height: 44px;
  margin-bottom: 0;
  justify-content: center;
`;

const CustomTitleButtonBody = styled.Text`
  font-weight: 400;
  font-size: 15px;
  line-height: 22px;
  letter-spacing: -0.41px;
  color: #333333;
`;

const CustomTitleDeleteButton = styled(CustomTitleButtonBody)`
  color: ${Colors.tartOrange};
`;

const TitleContact = styled.Text`
  font-weight: 400;
  font-size: 13px;
  line-height: 22px;
  letter-spacing: -0.41px;
  color: ${Colors.darkCharcoal};
  margin-bottom: 3px;
`;

const SubTitleContact = styled.Text`
  font-weight: 400;
  font-size: 17px;
  line-height: 22px;
  letter-spacing: -0.41px;
  color: ${Colors.bleuDeFrance};
`;

interface Props {
  item?: ContactInformation;
  onOpenModalMessage: () => void;
  onNavToCall: (value: string) => void;
  onNavToEmail: (value: string) => void;
  onRemoveContact: () => void;
}

const CustomTextButton = ({
  item,
  onHandleAction,
}: {
  item: string;
  onHandleAction?: (text: string) => void;
}) => {
  const onPress = useCallback(() => {
    onHandleAction && onHandleAction(item);
  }, [onHandleAction]);

  return (
    <TouchableOpacity onPress={onPress}>
      <SubTitleContact>{item}</SubTitleContact>
    </TouchableOpacity>
  );
};

const CustomFooterItem = ({
  item,
  onOpenModalMessage,
  onNavToCall,
  onNavToEmail,
  onRemoveContact,
}: Props) => {
  return (
    <>
      <CustomContactItem>
        <TitleContact>Điện thoại</TitleContact>
        <View>
          {item?.phoneNumberList &&
            item.phoneNumberList.length > 0 &&
            item?.phoneNumberList.map((phone, index) => (
              <CustomTextButton
                key={index}
                item={phone}
                onHandleAction={onNavToCall}
              />
            ))}
        </View>
      </CustomContactItem>
      <CustomEmailItem>
        <TitleContact>Email</TitleContact>
        <View>
          {item?.emailList &&
            item.emailList.length > 0 &&
            item?.emailList.map((email, index) => (
              <CustomTextButton
                key={index}
                item={email}
                onHandleAction={onNavToEmail}
              />
            ))}
        </View>
      </CustomEmailItem>
      <CustomEmailItem>
        <TitleContact>Địa chỉ</TitleContact>
        {item?.addressList &&
          item.addressList.length > 0 &&
          item?.addressList.map((address, index) => (
            <SubTitleContact key={index}>{address}</SubTitleContact>
          ))}
      </CustomEmailItem>
      <CustomNoteItem>
        <TitleContact>Ghi chú</TitleContact>
      </CustomNoteItem>
      <CustomContactButton>
        <TouchableOpacity onPress={onOpenModalMessage}>
          <CustomTitleButtonBody>Gửi tin nhắn</CustomTitleButtonBody>
        </TouchableOpacity>
      </CustomContactButton>
      <CustomContactButton>
        <TouchableOpacity onPress={onRemoveContact}>
          <CustomTitleDeleteButton>Xoá người gọi</CustomTitleDeleteButton>
        </TouchableOpacity>
      </CustomContactButton>
    </>
  );
};

export default memo(CustomFooterItem);
