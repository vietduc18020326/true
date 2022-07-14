import React, {useCallback} from 'react';
import styled from 'styled-components/native';
import {AlphabetList, IData} from 'react-native-section-alphabet-list';
import {Colors} from '@/themes/Colors';
import {ContactIdListProps, ContactInformation} from '@/type';
import {useContactById} from '@/store/contact';
import {AVATAR_DEFAULT} from '@/assets';
import {Dimensions, SectionListData, Text} from 'react-native';
import {navigateToContactDetailScreen} from '@/utils/navigation';
import {BaseStyles} from "@/themes/BaseStyles";

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
      const item: ContactInformation = useContactById(id.key);

      const onPress = () => {
        navigateToContactDetailScreen({id: id.key});
      };

      return (
        <CustomItem onPress={onPress}>
          <WrapAvatar>
            {item?.avatar ? (
              <Avatar source={item.avatar} />
            ) : (
              <WrapAvatarDefault>
                <AvatarDefault source={AVATAR_DEFAULT} />
              </WrapAvatarDefault>
            )}
          </WrapAvatar>
          <WrapInfo>
            <NameText>
              {item?.value !== '' ? item?.value : 'Không có tên'}
            </NameText>
            <PhoneNumberText numberOfLines={1}>
              {item?.phoneNumberList && item.phoneNumberList.length > 0
                ? item.phoneNumberList.map((phone: string, index: number) => (
                    <Text key={index}>{phone} </Text>
                  ))
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
      indexLetterStyle={{
        color: Colors.yellowOrange,
        fontWeight: '400',
        fontSize: 13,
        lineHeight: 22,
        letterSpacing: 0.12,
      }}
      indexLetterContainerStyle={{
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

export default CustomAlphabetList;
