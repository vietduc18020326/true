/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {LogBox} from 'react-native';
// @ts-ignore
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import SplashScreen from 'react-native-splash-screen';

import {persistor, store} from '@/store';
import Routes from './src/Routes';

const App = () => {
  useEffect(() => {
    LogBox.ignoreAllLogs();
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <Routes />
      </PersistGate>
    </Provider>
  );
};

export default App;
