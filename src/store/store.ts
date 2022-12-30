import {combineReducers, configureStore} from "@reduxjs/toolkit";
import currencyReducer from './reducers/currencySlice';
import {cryptoCurrenciesQueryAPI} from "../services/cryptoCurrenciesService";
import {fiatCurrenciesQueryAPI} from "../services/fiatCurrenciesService";

const rootReducer = combineReducers({
    currencyReducer,
    [cryptoCurrenciesQueryAPI.reducerPath]: cryptoCurrenciesQueryAPI.reducer,
    [fiatCurrenciesQueryAPI.reducerPath]: fiatCurrenciesQueryAPI.reducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat([cryptoCurrenciesQueryAPI.middleware, fiatCurrenciesQueryAPI.middleware])
    })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore =ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];