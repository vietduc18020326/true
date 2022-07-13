import React, {useState} from 'react'
import {TextInput, TouchableOpacity, View} from "react-native";
// @ts-ignore
import styled from "styled-components/native";

import {ADD} from "../../../../../assets";
import {Colors} from "../../../../../themes/Colors";

const WrapButton = styled.View`
  height: 44px;
  width: 90%;
  border-bottom-width: 0.5px;
  border-bottom-color: ${Colors.black10};
  justify-content: center;
`

const Icon = styled.Image`
  width: 24px;
  height: 24px;
  margin-right: 24px;
`

const CustomTitleButton = styled.Text`
  font-size: 15px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: -0.41px;
  color: ${Colors.darkCharcoal};
`
const CustomButton = styled.TouchableOpacity`
  flex-direction: row;
`


const AddButton = ({onAddNewItem,title} : {
    onAddNewItem: () => void;
    title: string;
}) => {
    return (
        <WrapButton>
            <CustomButton onPress={onAddNewItem}>
                <Icon source={ADD}/>
                <CustomTitleButton>{title}</CustomTitleButton>
            </CustomButton>
        </WrapButton>
    );
}

export default AddButton;
