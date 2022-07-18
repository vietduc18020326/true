import React, {useMemo, memo} from 'react';
import Avatar from '@/screen/components/Avatar';
import styled from 'styled-components/native';
import {Colors} from '@/themes/Colors';
import {ImageSourcePropType, Linking} from 'react-native';
import {CALL, CHAT_BUBBLE, EMAIL, VIDEO_CALL} from '@/assets';
import {ContactInformation} from '@/type';

const WrapHeaderItem = styled.View`
  background-color: ${Colors.yellowOrange10};
  align-items: center;
  width: 100%;
  padding-top: 8px;
  padding-bottom: 8px;
`;

const WrapTitleHeader = styled.View`
  padding-bottom: 20px;
  padding-top: 20px;
  align-items: center;
`;

const CustomTitleHeaderItem = styled.Text`
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: -0.41px;
  color: ${Colors.darkCharcoal};
`;

const WrapButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 80%;
`;

const CustomSubTitleHeaderItem = styled(CustomTitleHeaderItem)`
  font-weight: 400;
  font-size: 13px;
  color: ${Colors.oldSilver};
`;

const WrapButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

const IconButton = styled.Image<{disable: boolean}>`
  width: 24px;
  height: 24px;
  tint-color: ${props => (props.disable ? Colors.gainsboro : Colors.white)};
`;

const WrapIconButton = styled.View<{disable: boolean}>`
  width: 40px;
  height: 40px;
  border-radius: 24px;
  background-color: ${p => (p.disable ? Colors.white : Colors.yellowOrange)};
  justify-content: center;
  align-items: center;
  margin-bottom: 4px;
  border-color: ${p => (p.disable ? Colors.gray : Colors.yellowOrange)};
  border-width: 0.5px;
`;

const TitleButton = styled.Text<{disable: boolean}>`
  font-weight: 400;
  font-size: 11px;
  line-height: 22px;
  letter-spacing: -0.41px;
  color: ${p => (p.disable ? Colors.gray : Colors.yellowOrange)};
`;

const CustomButton = ({
  icon,
  title,
  disable,
  onPress,
}: {
  icon: ImageSourcePropType;
  title: string;
  disable: boolean;
  onPress: () => void;
}) => {
  return (
    <WrapButton disabled={disable} onPress={onPress}>
      <WrapIconButton disable={disable}>
        <IconButton disable={disable} source={icon} />
      </WrapIconButton>
      <TitleButton disable={disable}>{title}</TitleButton>
    </WrapButton>
  );
};

interface Props {
  item?: ContactInformation;
  setDataModal: Function;
  setModal: Function;
  onNavToCall: (value: string) => void;
  onNavToEmail: (value: string) => void;
}

const CustomHeaderItem = ({
  item,
  setDataModal,
  setModal,
  onNavToCall,
  onNavToEmail,
}: Props) => {
  const buttonList = useMemo(() => {
    if (!item) {
      return [];
    }

    return [
      {
        icon: CALL,
        title: 'Nhấn gọi điện',
        disable: item?.phoneNumberList.length <= 0,
        onPress: async () => {
          if (item?.phoneNumberList.length > 1) {
            setDataModal(item?.phoneNumberList);
            setModal('Call');
          } else {
            await onNavToCall(item.phoneNumberList[0]);
          }
        },
      },
      {
        icon: CHAT_BUBBLE,
        title: 'Nhắn tin',
        disable: item?.phoneNumberList.length <= 0,
        onPress: async () => {
          if (item?.phoneNumberList.length > 1) {
            setDataModal(item?.phoneNumberList);
            setModal('Message');
          } else {
            await Linking.openURL(`sms:${item.phoneNumberList[0]}`);
          }
        },
      },
      {
        icon: VIDEO_CALL,
        title: 'Facetime',
        disable: item?.phoneNumberList.length <= 0,
        onPress: async () => {
          if (item?.phoneNumberList.length > 1) {
            setDataModal(item?.phoneNumberList);
            setModal('Call');
          } else {
            await onNavToCall(item.phoneNumberList[0]);
          }
        },
      },
      {
        icon: EMAIL,
        title: 'Gửi email',
        disable: item?.emailList.length <= 0,
        onPress: async () => {
          if (item?.emailList.length > 1) {
            setDataModal(item?.emailList);
            setModal('Email');
          } else {
            await onNavToEmail(item.emailList[0]);
          }
        },
      },
    ];
  }, [item]);

  return (
    <WrapHeaderItem>
      <Avatar source={item?.avatar} />
      <WrapTitleHeader>
        <CustomTitleHeaderItem>{item?.value ?? ''}</CustomTitleHeaderItem>
        <CustomSubTitleHeaderItem>UI/UX Design</CustomSubTitleHeaderItem>
      </WrapTitleHeader>
      <WrapButtonContainer>
        {buttonList.map((button, index) => (
          <CustomButton key={index} {...button} />
        ))}
      </WrapButtonContainer>
    </WrapHeaderItem>
  );
};

export default memo(CustomHeaderItem);
