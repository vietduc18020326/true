import React, {memo, useMemo} from 'react';
import CustomButtonList from '@/screen/home/create_contact/components/button_list';
import {ContactInformation} from '@/type';
import {KeyboardTypeOptions} from 'react-native';

interface Props {
  itemDefault?: ContactInformation;
  setItem: Function;
}

interface ButtonList {
  title: string;
  keyName: string;
  data: string | Array<string>;
  keyboardType?: KeyboardTypeOptions;
  label?: string;
}

const CustomButtonListContainer = ({itemDefault, setItem}: Props) => {
  const buttonList: ButtonList[] = useMemo(() => {
    return [
      {
        title: 'thêm số điện thoại',
        label: 'số điện thoại',
        keyName: 'phoneNumberList',
        data: itemDefault?.phoneNumberList || [],
        keyboardType: 'numeric',
      },
      {
        title: 'thêm email',
        label: 'email',
        keyName: 'emailList',
        data: itemDefault?.emailList || [],
        keyboardType: 'email-address',
      },
      {
        title: 'thêm địa chỉ',
        label: 'địa chỉ',
        keyName: 'addressList',
        data: itemDefault?.addressList || [],
        keyboardType: 'default',
      },
      {
        title: 'thêm ngày sinh',
        keyName: 'birthday',
        data: itemDefault?.birthday || '',
      },
    ];
  }, [itemDefault]);

  return (
    <>
      {buttonList.map((b, index) => (
        <CustomButtonList key={index} setData={setItem} {...b} />
      ))}
    </>
  );
};

export default memo(CustomButtonListContainer);
