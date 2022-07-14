import React, {memo} from 'react';
import {GROUP, GROUP_SMALL, LOADING} from '@/assets';
import Container from '../components/Container';
import Header from '../components/Header';
import {navigateToContactScreen} from '@/utils/navigation';
import {Colors} from '@/themes/Colors';
import styled from 'styled-components/native';

const WrapHeader = styled.View`
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
`;

const WrapBody = styled.View`
  flex: 1;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 30px;
  line-height: 35px;
  letter-spacing: 0.12px;
  font-weight: 700;
  color: ${Colors.yellowOrange};
  text-align: center;
`;

const SubTitle = styled.Text`
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  letter-spacing: 0.12px;
  color: ${Colors.darkCharcoal};
  text-align: center;
  margin-top: 7px;
`;

const WrapTitle = styled.View`
  flex: 1;
`;

const WrapLoading = styled(WrapTitle)`
  justify-content: center;
`;

const Loading = styled.Image`
  width: 24px;
  height: 24px;
  align-items: center;
`;

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
  color: ${Colors.oldSilver};
`;

const WrapButton = styled.View`
  width: 100%;
  height: 110px;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;
`;

const LoginButton = styled.TouchableOpacity`
  width: 80%;
  height: 48px;
  background-color: ${Colors.yellowOrange};
  border-radius: 4px;
  justify-content: center;
  align-items: center;
`;

const TitleButton = styled.Text`
  font-weight: 500;
  font-size: 15px;
  line-height: 20px;
  letter-spacing: -0.24px;
  color: ${Colors.white};
`;

const ManualLoginButton = styled(LoginButton)`
  background-color: ${Colors.white};
  border-color: ${Colors.yellowOrange};
  border-width: 1px;
  justify-content: center;
  align-items: center;
`;

const SubTitleButton = styled(TitleButton)`
  color: ${Colors.yellowOrange};
`;

const LoginScreen = memo(() => {
  return (
    <Container>
      <Header />
      <WrapHeader>
        <ImageGroupSmall source={GROUP_SMALL} resizeMode={'stretch'} />
        <ImageGroup source={GROUP} resizeMode={'contain'} />
      </WrapHeader>
      <WrapBody>
        <WrapTitle>
          <Title>Base contact</Title>
          <SubTitle>
            {
              'Giải pháp quản lý công việc\n& dự án toàn diện cho doanh nghiệp 4.0'
            }
          </SubTitle>
        </WrapTitle>
        <WrapLoading>
          <Loading source={LOADING} resizeMode={'stretch'} />
        </WrapLoading>
      </WrapBody>
      <WrapFooter>
        <Note>Bạn chưa đăng nhập</Note>
        <WrapButton>
          <LoginButton onPress={navigateToContactScreen}>
            <TitleButton>ĐĂNG NHẬP BẰNG BASE ACCOUNT</TitleButton>
          </LoginButton>
          <ManualLoginButton>
            <SubTitleButton>ĐĂNG NHẬP THỦ CÔNG</SubTitleButton>
          </ManualLoginButton>
        </WrapButton>
      </WrapFooter>
    </Container>
  );
});

export default LoginScreen;
