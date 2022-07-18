import {createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from '@reduxjs/toolkit';
import {setContactStore, contactReducer} from './contact';

export const appReducers = combineReducers({
  contacts: contactReducer,
});

const persistConfig = {
  key: 'root',
  whitelist: ['contacts'],
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, appReducers);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);

// set store
setContactStore(store);
