import React, {useCallback, useState} from 'react'
// @ts-ignore
import styled from "styled-components/native";
import {
    launchCamera,
    launchImageLibrary
} from 'react-native-image-picker';

import {AVATAR_DEFAULT, CAMERA_ROUND} from "../../assets";
import {TouchableOpacity,View, PermissionsAndroid, Platform} from "react-native";
import {Colors} from "../../themes/Colors";

const AvatarDefaultView = styled.View`
  width: 100px;
  height: 100px;
  background-color: ${Colors.anti_flashWhite};
  border-radius: 50px;
  align-items: center;
  justify-content: center;
`

const AvatarDefault = styled.Image`
  width: 80px;
  height: 80px;
`

const WrapAvatar = styled.View`
  width: 100px
`

const Image = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
`

const Icon = styled.Image`
  width: 30px;
  height: 30px;
  position: absolute;
  bottom: 0;
  right: 0;
`

const Avatar = ({source,isButton,setData} : {source?: any; isButton?: boolean,setData?: Function}) => {
    const [filePath,setFilePath] = useState<any>();

    const WrapContainer: any = isButton ? TouchableOpacity : View;

    // const requestCameraPermission = async () => {
    //     if (Platform.OS === 'android') {
    //         try {
    //             const granted = await PermissionsAndroid.request(
    //                 PermissionsAndroid.PERMISSIONS.CAMERA,
    //                 {
    //                     title: 'Camera Permission',
    //                     message: 'App needs camera permission',
    //                 },
    //             );
    //             // If CAMERA Permission is granted
    //             return granted === PermissionsAndroid.RESULTS.GRANTED;
    //         } catch (err) {
    //             console.warn(err);
    //             return false;
    //         }
    //     } else return true;
    // };
    //
    // const requestExternalWritePermission = async () => {
    //     if (Platform.OS === 'android') {
    //         try {
    //             const granted = await PermissionsAndroid.request(
    //                 PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    //                 {
    //                     title: 'External Storage Write Permission',
    //                     message: 'App needs write permission',
    //                 },
    //             );
    //             // If WRITE_EXTERNAL_STORAGE Permission is granted
    //             return granted === PermissionsAndroid.RESULTS.GRANTED;
    //         } catch (err) {
    //             console.warn(err);
    //             alert('Write permission err', err);
    //         }
    //         return false;
    //     } else return true;
    // };

    const captureImage = async (type: string) => {
        let options: any = {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
            videoQuality: 'low',
            durationLimit: 30, //Video max duration in seconds
            saveToPhotos: true,
        };
        // let isCameraPermitted = await requestCameraPermission();
        // let isStoragePermitted = await requestExternalWritePermission();
        // if (isCameraPermitted && isStoragePermitted) {
        //     const result = await launchCamera(options);
        // }
    };

    const chooseFile = (type: string) => {
        let options: any = {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
        };
        launchImageLibrary(options).then((response) => {
            console.log('Response = ', response);

            // if (response.didCancel) {
            //     alert('User cancelled camera picker');
            //     return;
            // } else if (response.errorCode == 'camera_unavailable') {
            //     alert('Camera not available on device');
            //     return;
            // } else if (response.errorCode == 'permission') {
            //     alert('Permission not satisfied');
            //     return;
            // } else if (response.errorCode == 'others') {
            //     alert(response.errorMessage);
            //     return;
            // }
            if(response.assets) {
                setFilePath(response.assets[0].uri);
                setData && setData((preData:any) => ({
                    ...preData,
                    avatar: {uri: response.assets && response?.assets[0]?.uri}
                }))
            } else {
                setFilePath(undefined)
            }
        });
    };

    const onChangeAvatar = useCallback(() => {
        chooseFile('photo')
        // captureImage('photo')
    },[])

    const viewProps = isButton ? {onPress: onChangeAvatar} : {};

    return (
        <WrapAvatar>
            <WrapContainer {...viewProps}>
                {source || filePath ? (
                    <>
                        <Image source={filePath ? {uri: filePath} : source}/>
                        <>
                            {isButton && <Icon source={CAMERA_ROUND}/>}
                        </>
                    </>
                ) : (
                    <AvatarDefaultView>
                        <AvatarDefault source={AVATAR_DEFAULT}/>
                        <>
                            {isButton && <Icon source={CAMERA_ROUND}/>}
                        </>
                    </AvatarDefaultView>
                )}
            </WrapContainer>
        </WrapAvatar>
    );
}

export default Avatar;
