import React from 'react'
import {DrawerActions, NavigationContainerRef, StackActions} from "@react-navigation/native";
import {TransitionPresets} from '@react-navigation/stack';

import {ContactDetailScreenProps,CreateContactScreenProps} from "../type";

export const defaultScreenOptions = TransitionPresets.SlideFromRightIOS;

export const navigationRef = React.createRef<NavigationContainerRef<any>>();

export const navigation = () => navigationRef.current!;

export const createNavigate = <T extends object>(screenName: string) => (
    params?: T,
) => {
    return navigation().navigate(screenName, params);
};

export const goBack = () => navigation().goBack();

export const openDrawer = () => navigation().dispatch(DrawerActions.openDrawer());

export const reset = () => navigation().reset({
    index: 0,
    routes: [
        {
            name: 'Home',
        },
    ],
})

export const navigateToContactDetailScreen = createNavigate<ContactDetailScreenProps>(
    'ContactDetailScreen'
)

export const navigateToCreateContactScreen = createNavigate<CreateContactScreenProps>(
    'CreateContactScreen'
)

export const navigateToContactScreen = createNavigate<CreateContactScreenProps>(
    'Home'
)
