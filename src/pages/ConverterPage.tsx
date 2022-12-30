import React, {useState} from 'react';
import CurrencyGroup from "../components/CurrencyGroup";
import {cryptoCurrenciesQueryAPI} from "../services/cryptoCurrenciesService";
import {parseString} from "../utils/parseString";
import {ICurrencyCourseQueryParams, ICurrencyRecord} from "../models/CurrencyModels";
import {fiatCurrenciesQueryAPI} from "../services/fiatCurrenciesService";
import {useAppSelector} from "../hooks/redux-hooks";
import {Box} from "@mui/material";
import {blue} from "@mui/material/colors";


const ConverterPage = () => {
    const {data: cryptoCoinsData} = cryptoCurrenciesQueryAPI.useFetchAllCoinsQuery();
    const {data: fiatCurrenciesList} = fiatCurrenciesQueryAPI.useFetchCurrenciesListQuery();


    const removeIntersections = (): ICurrencyRecord[] | undefined => {
        if (cryptoCoinsData && fiatCurrenciesList) {
            return cryptoCoinsData.filter(item => !fiatCurrenciesList.includes(item.symbol.toUpperCase()));
        }
    }
    const uniqueCoinsData = removeIntersections();
    let fiatQueryParams: ICurrencyCourseQueryParams = {currencyIn: '', currencyOut: ''}
    let cryptoQueryParams: ICurrencyCourseQueryParams = {currencyIn: '', currencyOut: ''};
    const [fetchFiatCourse] = fiatCurrenciesQueryAPI.useLazyFetchCourseQuery();
    const [fetchCryptoCourse] = cryptoCurrenciesQueryAPI.useLazyFetchCourseQuery();
    const [currentInput, setCurrentInput] = useState('');
    const [conversionResult, setConversionResult] = useState('');
    const baseCurrency = useAppSelector(state => state.currencyReducer);

    const parseHandler = async () => {

        const {currencyIn, currencyOut, amount} = parseString(currentInput, baseCurrency.currency);
        if (uniqueCoinsData) {
            const inputInBase = uniqueCoinsData.find((record: ICurrencyRecord) => record.symbol === currencyIn);
            if (!!inputInBase) {
                cryptoQueryParams = {currencyIn: inputInBase.id, currencyOut};
                const cryptoCourse = await fetchCryptoCourse(cryptoQueryParams).unwrap();
                cryptoCourse ?
                    setConversionResult(`${amount} ${currencyIn} is ${(cryptoCourse * amount).toFixed(2)} ${cryptoQueryParams.currencyOut}`)
                    :
                    setConversionResult('Server error. Cannot get the course');
            } else {
                const outputInBase = uniqueCoinsData.find((record: ICurrencyRecord) => record.symbol === currencyOut);
                if (!!outputInBase) {
                    cryptoQueryParams = {currencyIn: outputInBase.id, currencyOut: currencyIn};
                    const cryptoCourse = await fetchCryptoCourse(cryptoQueryParams).unwrap();
                    cryptoCourse ?
                        setConversionResult(`${amount} ${currencyIn} is ${((1 / cryptoCourse!) * amount).toFixed(4)} ${currencyOut}`)
                        :
                        setConversionResult('Server error. Cannot get the course');
                }
            }

        }
        if (fiatCurrenciesList) {
            if (fiatCurrenciesList.includes(currencyIn.toUpperCase()) && fiatCurrenciesList.includes(currencyOut.toUpperCase())) {
                fiatQueryParams = {currencyIn, currencyOut};
                const fiatCourse = await fetchFiatCourse(fiatQueryParams).unwrap();
                fiatCourse ?
                    setConversionResult(`${amount} ${currencyIn} is ${(fiatCourse * amount).toFixed(2)} ${fiatQueryParams.currencyOut}`)
                    :
                    setConversionResult('Server error. Cannot get the course')
            }
        } else {
            setConversionResult('Server error. Cannot get coins data');
        }
    }

    return (
        <Box
            sx={{
                width: '35%',
                m: '2rem auto',
                border: '1px solid grey',
                borderRadius: '4px'
            }}>
            <h1>Convert your currency!</h1>
            <CurrencyGroup
                currentInput={currentInput}
                setCurrentInput={setCurrentInput}
                parseHandler={parseHandler}
            />
            {conversionResult && <Box
                sx={{
                    backgroundColor: blue[100],
                    width: '100%',
                    m: '0 auto'
                }}
            >
                <Box
                    sx={{
                        p: 3,
                        fontSize: 24,
                    }}>
                    {conversionResult}
                </Box>
            </Box>}
        </Box>
    );
};

export default ConverterPage;