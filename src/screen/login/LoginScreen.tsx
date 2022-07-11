import React from 'react'
// @ts-ignore
import styled from "styled-components/native";
import {Platform, Image, View} from "react-native";
import {getStatusBarHeight} from "react-native-iphone-x-helper";
import {useNavigation} from '@react-navigation/native'

import {IMAGES} from '../../assets'
import Container from "../components/Container";
import Header from "../components/Header";

const Wrap = styled.SafeAreaView`
 flex: 1;
  background-color: #ffffff;
`;

const WrapHeader = styled.View<{paddingTop: number}>`
  flex: 1;
`;

const ImageGroup = styled.Image`
  width: 100%;
  height: 200px;
  position: absolute;
  bottom: 0;
`;

const ImageGroupSmall = styled.Image`
  width: 200px;
  height: 200px;
  z-index: 100;
  position: absolute;
  bottom: 45px;
  align-self: center;
`

const WrapBody = styled.View`
  flex: 1;
  align-items: center;
`;

const Title = styled.Text`
font-size: 30px;
  line-height: 35px;
  letter-spacing: 0.12px;
  font-weight: 700;
  color: #F2A54A;
  text-align: center;
`

const SubTitle = styled.Text`
  font-weight: 400;
   font-size: 15px;
  line-height: 18px;
  letter-spacing: 0.12px;
  color: #333;
  text-align: center;
  margin-top: 7px;
`

const WrapTitle = styled.View`
  flex: 1;
`

const WrapLoading = styled(WrapTitle)`
  justify-content: center;
`

const Loading = styled.Image`
    width: 24px;
  height: 24px;
  align-items: center;
`

const WrapFooter = styled.View`
  flex: 1;
  justify-content: center;
`;

const Note = styled.Text`
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  letter-spacing: -0.24px;
  text-align: center;
  color: #828282;
`

const WrapButton = styled.View`
width: 100%;
  height: 110px;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;
`

const LoginButton = styled.TouchableOpacity`
  width: 80%;
  height: 48px;
  background-color: #F2A54A;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
`

const TitleButton = styled.Text`
  font-weight: 500;
  font-size: 15px;
  line-height: 20px;
  letter-spacing: -0.24px;
  color: #ffffff;
`

const ManualLoginButton = styled(LoginButton)`
  background-color: #ffffff;
  border-color: #F2A54A;
  border-width: 1px;
  justify-content: center;
  align-items: center;
`

const SubTitleButton = styled(TitleButton)`
  color: #F2A54A;
`


const LoginScreen = () => {
    const navigation = useNavigation<any>();

    const onNavToHomeScreen = React.useCallback(() => {
        navigation.navigate('Home')
    },[navigation])

    return (
        <Container>
            <Header/>
            <WrapHeader>
                <ImageGroupSmall source={IMAGES.groupSmall} resizeMode={'stretch'} />
                <ImageGroup source={IMAGES.group} resizeMode={'contain'} />
            </WrapHeader>
            <WrapBody>
                <WrapTitle>
                    <Title>
                        Base contact
                    </Title>
                    <SubTitle>
                        {'Giải pháp quản lý công việc\n& dự án toàn diện cho doanh nghiệp 4.0'}
                    </SubTitle>
                </WrapTitle>
                <WrapLoading>
                    <Loading source={IMAGES.loading} resizeMode={'stretch'}/>
                </WrapLoading>
            </WrapBody>
            <WrapFooter>
                <Note>Bạn chưa đăng nhập</Note>
                <WrapButton>
                    <LoginButton onPress={onNavToHomeScreen}>
                        <TitleButton>
                            ĐĂNG NHẬP BẰNG BASE ACCOUNT
                        </TitleButton>
                    </LoginButton>
                    <ManualLoginButton>
                        <SubTitleButton>
                            ĐĂNG NHẬP THỦ CÔNG
                        </SubTitleButton>
                    </ManualLoginButton>
                </WrapButton>
            </WrapFooter>
        </Container>
    )
}

export default LoginScreen;
