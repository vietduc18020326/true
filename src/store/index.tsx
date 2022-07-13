import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, configureStore, PayloadAction, combineReducers} from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import {constantSetStore, contactReducer} from "./contact";

export const appReducers = combineReducers({
    contacts: contactReducer.reducer
})

const persistConfig = {
    key: 'root',
    whitelist: ['contacts'],
    storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, appReducers)

export const store = createStore(persistedReducer)
export const persistor = persistStore(store)


// set store
constantSetStore(store)

