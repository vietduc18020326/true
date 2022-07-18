import React, {memo, useCallback} from 'react';
import styled from 'styled-components/native';
import {AlphabetList, IData} from 'react-native-section-alphabet-list';
import {Colors} from '@/themes/Colors';
import {ContactIdListProps, ContactInformation} from '@/type';
import {AVATAR_DEFAULT} from '@/assets';
import {Dimensions, SectionListData, Text, View} from 'react-native';
import {navigateToContactDetailScreen} from '@/utils/navigation';
import {BaseStyles} from '@/themes/BaseStyles';
import {useContact} from '@/store/contact';

const CustomSectionHeader = styled.View`
  width: 100%;
  height: 36px;
  background-color: ${Colors.white};
  justify-content: center;
  padding-left: 16px;
  margin-top: -1px;
`;

const BackgroundSectionHeader = styled.View`
  background-color: ${Colors.chineseWhite};
  opacity: 0.5;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;

const TitleHeader = styled.Text`
  font-weight: 500;
  font-size: 15px;
  line-height: 16px;
  letter-spacing: 0.12px;
  color: ${Colors.darkCharcoal};
`;

const CustomItem = styled.TouchableOpacity`
  height: 64px;
  width: ${Dimensions.get('screen').width - 30}px;
  flex-direction: row;
`;

const WrapAvatar = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const WrapInfo = styled.View`
  flex: 4;
  justify-content: center;
  border-bottom-color: ${Colors.black10};
  border-bottom-width: 1px;
`;

const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 50px;
`;

const AvatarDefault = styled.Image`
  width: 34px;
  height: 34px;
`;

const WrapAvatarDefault = styled.View`
  width: 40px;
  height: 40px;
  background-color: ${Colors.anti_flashWhite};
  border-radius: 50px;
  justify-content: center;
  align-items: center;
`;

const NameText = styled.Text`
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0.12px;
  color: ${Colors.darkCharcoal};
  margin-bottom: 5px;
`;

const PhoneNumberText = styled.Text`
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.12px;
  color: ${Colors.oldSilver};
`;

interface Props {
  ids?: ContactIdListProps[];
}

const CustomAlphabetList = ({ids}: Props) => {
  const renderCustomItem = useCallback(
    (id: ContactIdListProps) => {
      const contact: ContactInformation | undefined = useContact(id.key);

      const onPress = () => {
        navigateToContactDetailScreen({id: id.key});
      };

      if (!contact) {
        return <View />;
      }

      return (
        <CustomItem onPress={onPress}>
          <WrapAvatar>
            {contact?.avatar ? (
              <Avatar source={contact.avatar} />
            ) : (
              <WrapAvatarDefault>
                <AvatarDefault source={AVATAR_DEFAULT} />
              </WrapAvatarDefault>
            )}
          </WrapAvatar>
          <WrapInfo>
            <NameText>{contact?.value || 'Không có tên'}</NameText>
            <PhoneNumberText numberOfLines={1}>
              {contact?.phoneNumberList?.length > 0
                ? (contact?.phoneNumberList || []).map(
                    (phone: string, index: number) => (
                      <Text key={index}>{phone} </Text>
                    ),
                  )
                : 'Không có số điện thoại'}
            </PhoneNumberText>
          </WrapInfo>
        </CustomItem>
      );
    },
    [navigateToContactDetailScreen],
  );

  const renderCustomSectionHeader = useCallback(
    (section: SectionListData<IData>) => (
      <CustomSectionHeader>
        <BackgroundSectionHeader />
        <TitleHeader>{section.title}</TitleHeader>
      </CustomSectionHeader>
    ),
    [],
  );

  return (
    <AlphabetList
      uncategorizedAtTop
      data={ids ?? []}
      style={BaseStyles.flex1}
      renderCustomItem={renderCustomItem}
      renderCustomSectionHeader={renderCustomSectionHeader}
      index={customIndex}
      indexLetterStyle={BaseStyles.indexLetterStyle}
      indexLetterContainerStyle={BaseStyles.indexLetterContainerStyle}
      letterListContainerStyle={BaseStyles.letterListContainerStyle}
      indexContainerStyle={BaseStyles.indexContainerStyle}
    />
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

export default memo(CustomAlphabetList);
