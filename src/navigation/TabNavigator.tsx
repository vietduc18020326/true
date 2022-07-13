import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Platform} from "react-native";
// @ts-ignore
import styled from "styled-components/native";

import ContactScreen from "../screen/home/contact/ContactScreen";
import HistoryScreen from "../screen/home/history/HistoryScreen";
import {ICONS} from "../assets";

const Tab = createBottomTabNavigator();

const Icon = styled.Image`
  width: 24px;
  height: 24px;
`

function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#F2A54A',
                    height: Platform.OS === 'ios' ? 80 : 60
                },
                tabBarLabelStyle: {
                  paddingVertical: Platform.OS === 'ios' ? 0 : 8
                },
                tabBarActiveTintColor: '#FFFFFF',
                tabBarInactiveTintColor: '#FFDAAE',
        }}>
            <Tab.Screen
                name="Contact"
                component={ContactScreen} options={{
                tabBarLabel: 'Danh bạ',
                tabBarIcon: ({focused}) => (
                    <Icon source={focused ? ICONS.phoneBook : ICONS.phoneBook_inactive} resizeMode='stretch'/>
                )
            }}/>
            <Tab.Screen
                name="History"
                component={HistoryScreen}
                options={{
                    tabBarLabel: 'Gần đây',
                    tabBarIcon: ({focused}) => (
                        <Icon source={focused ? ICONS.watch : ICONS.watch_inactive} resizeMode='stretch'/>
                    )
                }}/>
        </Tab.Navigator>
    )
}

export default TabNavigator;
