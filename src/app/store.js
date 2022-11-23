import { combineReducers, configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import storageSession from 'redux-persist/lib/storage/session'
import { PersistGate } from 'redux-persist/integration/react'

const persistConfig = {
  key: 'root',
  version: 1,
  storage: storageSession,
}

const rootReducer = combineReducers({
  counter: counterReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
