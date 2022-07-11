import React from 'react'
import {View,Text} from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
// @ts-ignore
import styled from "styled-components/native";

import TabNavigator from "./TabNavigator";
import CustomDrawer from './components/CustomDrawer'

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                drawerType: 'front'
            }}
            drawerContent={(props) => <CustomDrawer {...props}/>}
        >
            <Drawer.Screen name="Tab" component={TabNavigator} />
        </Drawer.Navigator>
    );
}

export default DrawerNavigator
