import React, {memo, useCallback} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {navigationRef} from '@/utils/navigation';
import DrawerContent from './screen/DrawerContent';
import {Platform} from 'react-native';
import ContactScreen from '@/screen/home/contact/ContactScreen';
import {PHONEBOOK, PHONEBOOK_INACTIVE, WATCH, WATCH_INACTIVE} from '@/assets';
import HistoryScreen from '@/screen/home/history/HistoryScreen';
import styled from 'styled-components/native';
import LoginScreen from '@/screen/login/LoginScreen';
import CreateContactScreen from '@/screen/home/create_contact/CreateContactScreen';
import ContactDetailScreen from '@/screen/home/contact_detail/ContactDetailScreen';
import {Colors} from '@/themes/Colors';

const Icon = styled.Image`
  width: 24px;
  height: 24px;
`;

const RootStack = createStackNavigator();
const ModalStack = createStackNavigator();
const DrawerStack = createDrawerNavigator();
const TabStack = createBottomTabNavigator();

const TabStackComponent = memo(function TabNavigator() {
  return (
    <TabStack.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.yellowOrange,
          height: Platform.OS === 'ios' ? 80 : 60,
        },
        tabBarLabelStyle: {
          paddingVertical: Platform.OS === 'ios' ? 0 : 8,
        },
        tabBarActiveTintColor: Colors.white,
        tabBarInactiveTintColor: Colors.lightOrange,
      }}>
      <TabStack.Screen
        name="Contact"
        component={ContactScreen}
        options={{
          tabBarLabel: 'Danh bạ',
          tabBarIcon: ({focused}) => (
            <Icon
              source={focused ? PHONEBOOK : PHONEBOOK_INACTIVE}
              resizeMode="stretch"
            />
          ),
        }}
      />
      <TabStack.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarLabel: 'Gần đây',
          tabBarIcon: ({focused}) => (
            <Icon
              source={focused ? WATCH : WATCH_INACTIVE}
              resizeMode="stretch"
            />
          ),
        }}
      />
    </TabStack.Navigator>
  );
});

const DrawerStackComponent = memo(function DrawerStackComponent() {
  return (
    <DrawerStack.Navigator
      screenOptions={{
        headerShown: false,
        swipeEnabled: false,
      }}
      drawerContent={() => <DrawerContent />}
      initialRouteName={'Main'}>
      <DrawerStack.Screen name={'Main'} component={TabStackComponent} />
    </DrawerStack.Navigator>
  );
});

export const ModalStackComponent = memo(function ModalStackComponent() {
  return (
    <ModalStack.Navigator
      initialRouteName={'LoginScreen'}
      screenOptions={{
        headerShown: false,
      }}>
      <RootStack.Screen name={'LoginScreen'} component={LoginScreen} />
      <ModalStack.Screen name={'Home'} component={DrawerStackComponent} />
      <RootStack.Screen
        name={'CreateContactScreen'}
        component={CreateContactScreen}
      />
      <RootStack.Screen
        name={'ContactDetailScreen'}
        component={ContactDetailScreen}
      />
    </ModalStack.Navigator>
  );
});

export const Routes = memo(function Routes() {
  const routeNameRef = React.useRef<string>('');
  const onStateChange = useCallback(() => {
    const previousRouteName = routeNameRef.current;
    // @ts-ignore
    const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;

    if (currentRouteName && previousRouteName !== currentRouteName) {
      // analytics().setCurrentScreen(currentRouteName);
      routeNameRef.current = currentRouteName;
    }
  }, []);

  return (
    <NavigationContainer ref={navigationRef} onStateChange={onStateChange}>
      <RootStack.Navigator
        initialRouteName={'Root'}
        screenOptions={{
          headerShown: false,
        }}>
        <RootStack.Screen name={'Root'} component={ModalStackComponent} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
});

export default Routes;
