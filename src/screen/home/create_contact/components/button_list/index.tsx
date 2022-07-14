import React, {useCallback, useEffect, useState} from 'react';
import {KeyboardTypeOptions} from 'react-native';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
// @ts-ignore
import styled from 'styled-components/native';

import RemoveButton from './RemoveButton';
import AddButton from './AddButton';

const WrapButtonList = styled.View<{marginBottom?: number}>`
  margin-bottom: 24px;
  width: 100%;
  align-items: center;
`;

interface Props {
  title: string;
  keyName: string;
  setData: Function;
  keyboardType?: KeyboardTypeOptions;
  data?: Array<string> | string;
  label?: string;
}

const CustomButtonListContainer = ({
  title,
  keyName,
  setData,
  keyboardType,
  data,
  label,
}: Props) => {
  const [items, setItems] = useState<
    Array<{
      id: string;
      data: string;
    }>
  >([]);
  const [date, setDate] = useState(new Date());
  const [dateString, setDateString] = useState<string>('');
  const [open, setOpenDatePicker] = useState(false);

  useEffect(() => {
    if (!data || !data.length) {
      return;
    }
    if (typeof data === 'string') {
      setDateString(data);
      return;
    }
    const newItems = data.map((_item, index) => ({
      id: new Date().getTime().toString() + index.toString(),
      data: _item,
    }));
    setItems(newItems);
  }, [data]);

  useEffect(() => {
    if (!items.length) {
      return;
    }
    const _data = items.map(item => item.data);
    setData((prevItem: any) => ({
      ...prevItem,
      [keyName]: _data,
    }));
  }, [items]);

  useEffect(() => {
    if (dateString && dateString !== '') {
      setData((prevItem: any) => ({
        ...prevItem,
        [keyName]: dateString,
      }));
    }
  }, [dateString]);

  const onAddNewItem = React.useCallback(() => {
    if (keyboardType) {
      setItems(prevItems =>
        prevItems.concat([
          {
            id: new Date().getTime().toString(),
            data: '',
          },
        ]),
      );
    } else {
      setOpenDatePicker(true);
    }
  }, [keyboardType]);

  const onRemoveItem = React.useCallback(
    (id: string) => {
      if (keyboardType) {
        setItems(prevItems => prevItems.filter(_item => _item.id !== id));
      } else {
        setDateString('');
      }
    },
    [keyboardType],
  );

  const onChange = React.useCallback(
    (id?: string, _data?: string) => {
      if (id && typeof _data === 'string') {
        setItems(prevItems =>
          prevItems.map(item => {
            if (item.id === id) {
              return {id, data: _data};
            }
            return item;
          }),
        );
      } else {
        if (!keyboardType) {
          setOpenDatePicker(true);
        }
      }
    },
    [keyboardType],
  );

  const onConfirmDate = useCallback((date: Date) => {
    setOpenDatePicker(false);
    setDate(date);
    setDateString(moment(date).format('DD/MM/YYYY'));
  }, []);

  const onCancel = useCallback(() => {
    setOpenDatePicker(false);
  }, []);

  return (
    <WrapButtonList>
      <DatePicker
        modal
        mode={'date'}
        open={open}
        date={date}
        onConfirm={onConfirmDate}
        onCancel={onCancel}
      />
      {keyboardType && label
        ? items.length > 0 &&
          items.map((item, index) => (
            <RemoveButton
              key={item.id}
              item={item}
              label={label}
              onRemove={onRemoveItem}
              onChange={onChange}
              keyboardType={keyboardType}
            />
          ))
        : dateString !== '' && (
            <RemoveButton
              item={{id: dateString ?? '', data: dateString ?? ''}}
              onRemove={onRemoveItem}
              onChange={onChange}
            />
          )}
      <AddButton title={title} onAddNewItem={onAddNewItem} />
    </WrapButtonList>
  );
};

export default CustomButtonListContainer;
