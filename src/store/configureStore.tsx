import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, configureStore, PayloadAction} from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import {contactReducer} from "./index";

// import rootReducer from './reducers'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, contactReducer.reducer)

export const store = createStore(persistedReducer)
export const persistor = persistStore(store)

