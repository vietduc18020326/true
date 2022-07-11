/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import RootNavigator from "./src/navigation/RootNavigator";
import {Provider} from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'

// import {store} from './src/store';
import {store,persistor} from './src/store/configureStore'

const App = () => {

  return (
      <Provider store={store}>
        {/*<StatusBar*/}
        {/*    animated={true}*/}
        {/*    // backgroundColor="red"*/}
        {/*    // barStyle={statusBarStyle}*/}
        {/*    // showHideTransition={statusBarTransition}*/}
        {/*/>*/}
        <PersistGate persistor={persistor} loading={null}>
            <RootNavigator/>
        </PersistGate>
      </Provider>

  );
};


export default App;
