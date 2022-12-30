import React, {useEffect, useState} from 'react';
import './App.css';
import ConverterPage from "./pages/ConverterPage";
import AppHeader from "./components/AppHeader";
import {useAppDispatch, useAppSelector} from "./hooks/redux-hooks";
import {currencySlice} from "./store/reducers/currencySlice";
import {Route, Routes} from "react-router-dom";
import CoursesPage from "./pages/CoursesPage";
import {cryptoCurrenciesQueryAPI} from "./services/cryptoCurrenciesService";
import {fiatCurrenciesQueryAPI} from "./services/fiatCurrenciesService";
import {pickBaseCurrencies} from "./utils/pickBaseCurrencies";
import {currencySymbols} from "./models/CurrencyModels";


function App() {
    const [fetchCoinsList, fetchCoinsListResult] = cryptoCurrenciesQueryAPI.useLazyFetchAllCoinsQuery();
    const [fetchCryptoVsCurrenciesSymbols, fetchCryptoVsCurrenciesSymbolsResult] = cryptoCurrenciesQueryAPI.useLazyFetchCurrenciesListQuery();
    const [fetchFiatSymbolsList, fetchFiatSymbolsListResult] = fiatCurrenciesQueryAPI.useLazyFetchCurrenciesListQuery();
    const {isFetching: cryptoSymbolsListIsFetching} = fetchCryptoVsCurrenciesSymbolsResult;
    const {isFetching: cryptoCoinsDataIsFetching} = fetchCoinsListResult;
    const {isFetching: fiatSymbolsListIsFetching} = fetchFiatSymbolsListResult;
    const [baseCurrencies, setBaseCurrencies] = useState<string[]>([]);
    let baseCurrenciesInfo: currencySymbols = {baseCurrencies:[], cryptoCurrencies: [], fiatCurrencies: []};

    const baseCurrency = useAppSelector(state => state.currencyReducer);
    const dispatch = useAppDispatch();
    useEffect(()=>{
        const loadedBaseCurrency = localStorage.getItem('baseCurrency');
        if(loadedBaseCurrency){
            dispatch(currencySlice.actions.setBaseCurrency(loadedBaseCurrency));
        }
        else {
            localStorage.setItem('baseCurrency', 'USD');
        }
    }, [])

    const selectDefaultValue = baseCurrency.currency ? baseCurrency.currency : 'USD';

    const loadBaseCurrencies = async () => {
        const coinsData = await fetchCoinsList().unwrap();
        const cryptoSymbols = await fetchCryptoVsCurrenciesSymbols().unwrap();
        const fiatSymbols = await fetchFiatSymbolsList().unwrap();
        baseCurrenciesInfo = pickBaseCurrencies(coinsData,cryptoSymbols,fiatSymbols);
        setBaseCurrencies(baseCurrenciesInfo.baseCurrencies);
    }

  return (
    <div className="App">
      <AppHeader
          currenciesList={baseCurrencies}
          loadBaseCurrencies={loadBaseCurrencies}
          isFetching={cryptoSymbolsListIsFetching || cryptoCoinsDataIsFetching || fiatSymbolsListIsFetching}
          selectDefaultValue={selectDefaultValue}
      />
        <Routes>
            <Route path={'/'} element={<CoursesPage/>}/>
            <Route path={'/convert'} element={<ConverterPage />}/>
        </Routes>
    </div>
  );
}

export default App;
