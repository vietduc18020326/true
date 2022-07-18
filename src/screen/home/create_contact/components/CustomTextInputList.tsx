import React, {memo} from 'react'
import CustomTextInput from "@/screen/home/create_contact/components/CustomTextInput";
import {ContactInformation} from "@/type";
import {Colors} from "@/themes/Colors";
import styled from "styled-components/native";

const WrapTextInput = styled.View`
  width: 100%;
  margin-bottom: 24px;
  align-items: center;
`;

const textInputList = [
    {label: 'Họ', keyName: 'lastName'},
    {label: 'Tên', keyName: 'firstName'},
    {label: 'Công ty', keyName: 'company'},
];

interface Props {
    item: ContactInformation;
    setItem: Function;
}

const CustomTextInputList = ({item,setItem}: Props) => {
    return (
        <WrapTextInput>
            {textInputList.map((value, index) => (
                <CustomTextInput
                    autoFocus={index === 0}
                    key={index}
                    placeholder={value.label}
                    value={item[value.keyName as keyof ContactInformation]}
                    keyName={value.keyName}
                    item={item}
                    setItem={setItem}
                    placeholderTextColor={Colors.gray}
                />
            ))}
        </WrapTextInput>
    );
}

export default memo(CustomTextInputList);
