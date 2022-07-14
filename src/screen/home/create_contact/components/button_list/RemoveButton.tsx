import React from 'react';
import {TouchableOpacity, KeyboardTypeOptions} from 'react-native';
import styled from 'styled-components/native';

import {REMOVE} from '@/assets';
import {Colors} from '@/themes/Colors';

const WrapButton = styled.View`
  height: 44px;
  width: 90%;
  border-bottom-width: 0.5px;
  border-bottom-color: ${Colors.black10};
`;

const CustomRemoveButtonContainer = styled.View`
  flex-direction: row;
`;

const Icon = styled.Image`
  width: 24px;
  height: 24px;
  margin-right: 24px;
  margin-top: 10px;
`;

const CustomTextInput = styled.TextInput`
  color: ${Colors.bleuDeFrance};
  flex: 1;
  font-weight: 400;
  font-size: 15px;
  line-height: 22px;
  letter-spacing: -0.41px;
  height: 44px;
  padding-bottom: 5px;
`;

const CustomButton = styled.TouchableOpacity`
  flex: 1;
  height: 44px;
  justify-content: center;
`;

const CustomTitleButton = styled.Text`
  font-weight: 400;
  font-size: 15px;
  line-height: 22px;
  letter-spacing: -0.41px;
  color: ${Colors.bleuDeFrance};
`;

interface Props {
  onRemove: (item: string) => void;
  onChange: (id?: string, data?: string) => void;
  item: {
    data: string;
    id: string;
  };
  keyboardType?: KeyboardTypeOptions;
  label?: string;
}

const RemoveButton = ({
  onRemove,
  item,
  onChange,
  keyboardType,
  label,
}: Props) => {
  const onPress = React.useCallback(() => {
    onRemove && onRemove(item.id);
  }, [onRemove]);

  const onChangeText = React.useCallback(
    (text: string) => {
      onChange && onChange(item.id, text);
    },
    [onChange],
  );

  return (
    <WrapButton>
      <CustomRemoveButtonContainer>
        <TouchableOpacity onPress={onPress}>
          <Icon source={REMOVE} />
        </TouchableOpacity>
        {keyboardType ? (
          <CustomTextInput
            autoFocus={item.data === ''}
            placeholder={label ?? ''}
            keyboardType={keyboardType}
            value={item.data}
            onChangeText={onChangeText}
            placeholderTextColor={'#BDBDBD'}
          />
        ) : (
          <CustomButton onPress={onChange}>
            <CustomTitleButton>{item.data}</CustomTitleButton>
          </CustomButton>
        )}
      </CustomRemoveButtonContainer>
    </WrapButton>
  );
};

export default RemoveButton;
