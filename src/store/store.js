import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';
import logger from 'redux-logger';

//When you add middleware you dont use default toolkits middleware
const middlewares = [process.env.NODE_ENV === 'development' && logger].filter(Boolean);

//import { compose, createStore, applyMiddleware } from 'redux';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(middlewares),
});
// const persistConfig = {
//     key: 'root',
//     storage,
//     blacklist: ['user']
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = createStore(persistedReducer, compose(applyMiddleware(logger)));

// export const persistor = persistStore(store);
