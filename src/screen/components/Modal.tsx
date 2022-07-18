import React, {useCallback} from 'react';
import {
  Linking,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import styled from 'styled-components/native';

const WrapModal = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: flex-end;
  align-items: center;
`;

const TitleButton = styled.Text`
  text-align: center;
`;

const Card = styled.View`
  width: 90%;
  background-color: white;
  padding: 20px 16px 20px 16px;
  border-radius: 20px;
  margin-bottom: 15px;
`;

const CustomButton = ({
  onHandle,
  item,
  label,
}: {
  item: string;
  label: string;
  onHandle: (item: string) => void;
}) => {
  const onPress = useCallback(() => {
    onHandle(item);
  }, []);

  return (
    <TouchableOpacity onPress={onPress}>
      <Text>
        {label} {item}
      </Text>
    </TouchableOpacity>
  );
};

const CustomModal = ({
  modal,
  setModal,
  dataModal,
}: {
  modal: string;
  setModal: Function;
  dataModal?: Array<string>;
}) => {
  const onHandleButton = useCallback(
    async (item: string) => {
      let label = '';
      if (modal === 'Call') {
        label = 'tel:';
      }
      if (modal === 'Message') {
        label = 'sms:';
      }
      if (modal === 'Email') {
        label = 'mailto:';
      }

      await Linking.openURL(label + item);
    },
    [modal],
  );

  const onCloseModal = useCallback(() => {
    setModal('');
  }, []);

  return (
    <Modal
      animationType="fade"
      statusBarTranslucent
      transparent
      visible={modal !== ''}
      onRequestClose={onCloseModal}>
      <TouchableWithoutFeedback onPress={onCloseModal}>
        <WrapModal>
          {dataModal &&
            dataModal.length > 0 &&
            dataModal.map((item, index) => (
              <Card key={index}>
                <CustomButton
                  item={item}
                  label={modal}
                  onHandle={onHandleButton}
                />
              </Card>
            ))}
          <Card>
            <TouchableOpacity onPress={onCloseModal}>
              <TitleButton>Cancel</TitleButton>
            </TouchableOpacity>
          </Card>
        </WrapModal>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CustomModal;
