import React, {useCallback, useState} from 'react';
import styled from 'styled-components/native';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';

import {AVATAR_DEFAULT, CAMERA_ROUND} from '@/assets';
import {TouchableOpacity, View} from 'react-native';
import {Colors} from '@/themes/Colors';

const AvatarDefaultView = styled.View`
  width: 100px;
  height: 100px;
  background-color: ${Colors.anti_flashWhite};
  border-radius: 50px;
  align-items: center;
  justify-content: center;
`;

const AvatarDefault = styled.Image`
  width: 80px;
  height: 80px;
`;

const WrapAvatar = styled.View`
  width: 100px;
`;

const Image = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;

const Icon = styled.Image`
  width: 30px;
  height: 30px;
  position: absolute;
  bottom: 0;
  right: 0;
`;

const Avatar = ({
  source,
  isButton,
  setData,
}: {
  source?: any;
  isButton?: boolean;
  setData?: Function;
}) => {
  const [filePath, setFilePath] = useState<any>();

  const WrapContainer: any = isButton ? TouchableOpacity : View;

  const chooseFile = () => {
    let options: ImageLibraryOptions = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options).then(response => {
      if (response.assets) {
        setFilePath(response.assets[0].uri);
        setData &&
          setData((preData: any) => ({
            ...preData,
            avatar: {uri: response.assets && response?.assets[0]?.uri},
          }));
      } else {
        setFilePath(undefined);
      }
    });
  };

  const onChangeAvatar = useCallback(() => {
    chooseFile();
  }, [chooseFile]);

  const viewProps = isButton ? {onPress: onChangeAvatar} : {};

  return (
    <WrapAvatar>
      <WrapContainer {...viewProps}>
        {source || filePath ? (
          <>
            <Image source={filePath ? {uri: filePath} : source} />
            <>{isButton && <Icon source={CAMERA_ROUND} />}</>
          </>
        ) : (
          <AvatarDefaultView>
            <AvatarDefault source={AVATAR_DEFAULT} />
            <>{isButton && <Icon source={CAMERA_ROUND} />}</>
          </AvatarDefaultView>
        )}
      </WrapContainer>
    </WrapAvatar>
  );
};

export default Avatar;
