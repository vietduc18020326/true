import React from 'react'
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import LoginScreen from "../screen/login/LoginScreen";
import DrawerNavigator from "./DrawerNavigator";
import ContactDetailScreen from "../screen/home/contact_detail";
import CreateContactScreen from "../screen/home/create_contact";

const Stack = createNativeStackNavigator()

function RootNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name={'Login'} component={LoginScreen} />
                <Stack.Screen name={'Home'} component={DrawerNavigator}/>
                <Stack.Screen name={'Contact_detail'} component={ContactDetailScreen}/>
                <Stack.Screen name={'Create_contact'} component={CreateContactScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootNavigator;
