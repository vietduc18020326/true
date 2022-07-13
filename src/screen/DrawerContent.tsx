import React from "react";
// @ts-ignore
import styled from "styled-components/native";
import {Text, View} from "react-native";

import {ADD_BOX, ASSIGNMENT_IND, AVATAR1} from "../assets";
import {Colors} from "../themes/Colors";

const WrapHeader = styled.View`
  flex: 1;
  background-color: ${Colors.yellowOrange};
  align-items: flex-end;
  padding-left: 20px;
  padding-bottom: 12px;
  flex-direction: row;
`;

const WrapBody = styled.View`
  flex: 9;
`

const Avatar = styled.Image`
  width: 40px;
  height: 40px;
`

const UserName = styled.Text`
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0.12px;
  color: ${Colors.white};
`

const RoleText = styled.Text`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.12px;
  color: ${Colors.white};
`

const TopBody = styled.View`
  margin-top: 8px;
  margin-bottom: 8px;
`

const WrapButton = styled.View`
  flex-direction: row;
  height: 44px;
  width: 100%;
  padding-left: 20px;
  padding-right: 6px;
  background-color: ${Colors.yellowOrange10};
  align-items: center;
  justify-content: space-between;
`

const TextLeftButton = styled.Text`
  font-weight: 700;
  font-size: 13px;
  line-height: 16px;
  letter-spacing: 0.12px;
  color: ${Colors.darkCharcoal};
`

const TextRightButton = styled(TextLeftButton)`
  font-weight: 500;
  color: ${Colors.yellowOrange};
`

const list1 = [{
    icon: ADD_BOX,
    title: 'New collection'
}]

const list2 = [{
    icon: ASSIGNMENT_IND,
    title: 'All'
},{
    icon: ASSIGNMENT_IND,
    title: 'General'
},{
    icon: ASSIGNMENT_IND,
    title: 'Investors'
},{
    icon: ASSIGNMENT_IND,
    title: 'Lead'
},{
    icon: ASSIGNMENT_IND,
    title: 'VIP'
}]

const WrapCell = styled.View`
  flex-direction: row;
  height: 44px;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  padding-left: 20px;
`

const Icon = styled.Image`
  width: 24px;
  height: 24px;
  margin-right: 20px;
`

const TitleCell = styled(RoleText)`
  font-size: 15px;
  color: ${Colors.darkCharcoal};
`

const Cell = ({icon,title}: {icon: any;title: string}) => {
    return (
        <WrapCell>
            <Icon source={icon}/>
            <TitleCell>{title}</TitleCell>
        </WrapCell>
    )
}

const DrawerContent = ({props}: any) => {
    return (
        <>
            <WrapHeader>
                <Avatar source={AVATAR1} resizeMode='stretch'/>
                <View style={{marginLeft: 9, justifyContent: 'center'}}>
                    <UserName>Nguyen Tien Nam</UserName>
                    <RoleText>Admin Admin</RoleText>
                </View>
            </WrapHeader>
            <WrapBody>
                <TopBody>
                    {list1.map((item,index) => (
                        <Cell key={index} icon={item.icon} title={item.title}/>
                    ))}
                </TopBody>
                <WrapButton>
                    <TextLeftButton>COLLECTIONS</TextLeftButton>
                    <TextRightButton>Edit</TextRightButton>
                </WrapButton>
                {list2.map((item,index) => (
                    <Cell key={index} icon={item.icon} title={item.title}/>
                ))}
            </WrapBody>
        </>
    );
}

export default DrawerContent;
