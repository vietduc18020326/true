import React, {useCallback} from 'react';
// @ts-ignore
import styled from 'styled-components/native';
import {TextInputProps} from 'react-native';

import {ContactInformation} from '@/type';
import {Colors} from '@/themes/Colors';

const STextInput = styled.TextInput`
  width: 90%;
  height: 44px;
  border-bottom-width: 0.5px;
  border-bottom-color: ${Colors.black10};
  font-weight: 400;
  font-size: 15px;
  line-height: 22px;
  letter-spacing: -0.41px;
  color: ${Colors.darkCharcoal};
`;

interface Props extends TextInputProps {
  setItem: Function;
  item: ContactInformation;
  keyName: string;
}

const CustomTextInput = (props: Props) => {
  const {item, keyName, setItem} = props;

  const onChangeText = useCallback(
    (text: string) => {
      const newItem = {
        ...item,
        [keyName]: text,
      };
      setItem(newItem);
    },
    [item, keyName, setItem],
  );

  return <STextInput onChangeText={onChangeText} {...props} />;
};

export default CustomTextInput;
