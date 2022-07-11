import React, {useCallback} from 'react'
import {Linking, Modal, Text, TouchableOpacity, View} from "react-native";
// @ts-ignore
import styled from "styled-components/native";

const WrapModal = styled.View`
  flex: 1;
  background-color: rgba(0,0,0,0.5);
  justify-content: center;
  align-items: center;
`

const Card = styled.View`
  width: 60%;
  background-color: white;
  padding: 30px 16px 30px 16px;
  border-radius: 20px;
`

const CustomButton = ({onHandle,item} : {
    item: string;
    onHandle: (item: string) => void;
}) => {
    const onPress = useCallback(() => {
        onHandle(item)
    },[])

    return (
        <TouchableOpacity onPress={onPress}>
            <Text>{item}</Text>
        </TouchableOpacity>
    )
}

const CustomModal = ({modal,setModal,dataModal} : {
    modal: string;
    setModal: Function;
    dataModal?: Array<string>
}) => {
    const onHandleButton = useCallback(async (item: string) => {
        let label = ''
        if(modal === 'Call') {
            label = 'tel:'
        }
        if(modal === 'Message') {
            label = 'sms:'
        }
        if(modal === 'Email') {
            label = 'mailto:'
        }

        await Linking.openURL(label + item)
    },[modal])

    return (
        <Modal
            animationType='fade'
            statusBarTranslucent
            transparent
            visible={modal !== ''}
            onRequestClose={() => {
                setModal('');
            }}
        >
            <WrapModal>
                <Card>
                    {dataModal && dataModal.length > 0 && dataModal.map((item,index) => (
                        <CustomButton item={item} onHandle={onHandleButton} key={index}/>
                    ))}
                    <TouchableOpacity onPress={() => setModal('')}>
                        <Text>Cancel</Text>
                    </TouchableOpacity>
                </Card>
            </WrapModal>
        </Modal>
    )
}

export default CustomModal
