import { configureStore } from '@reduxjs/toolkit'
// import rootReducer from './reducers/rootReducer'
import counterReducer from './slices/counterSlice'
import loginReducer from './slices/loginSlice'
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

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const persistedReducer = persistReducer(persistConfig, loginReducer)

// export const store = configureStore({
//     reducer: {
//         counter: counterReducer,
//         login: loginReducer
//     }
// })

export const store = configureStore({
    reducer: {
        counter :counterReducer,
        login : persistedReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})