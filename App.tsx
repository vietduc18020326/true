/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Provider} from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'

// import {store} from './src/store';
import {store,persistor} from './src/store'
import Routes from "./src/Routes";

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
            <Routes/>
        </PersistGate>
      </Provider>

  );
};


export default App;
