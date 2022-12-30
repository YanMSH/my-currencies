import React, {useEffect, useState} from 'react';
import {cryptoCurrenciesQueryAPI} from "../services/cryptoCurrenciesService";
import {fiatCurrenciesQueryAPI} from "../services/fiatCurrenciesService";
import {pickBaseCurrencies} from "../utils/pickBaseCurrencies";
import {useAppSelector} from "../hooks/redux-hooks";
import {CurrencyCourseEntries} from "../models/CurrencyModels";
import {Stack, styled, Paper, Box} from "@mui/material";
import {red} from "@mui/material/colors";
import StringInput from "../components/StringInput";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: '#fff',
    padding: theme.spacing(2),
    textAlign: 'center',
    width: '30%',
    margin: '0 auto',
    '&&': {
        margin: '1rem auto'
    }
}));

const CoursesPage = () => {
    const {data: cryptoCoinsData} = cryptoCurrenciesQueryAPI.useFetchAllCoinsQuery();
    const {data: cryptoOutCurrenciesList} = cryptoCurrenciesQueryAPI.useFetchCurrenciesListQuery();
    const {data: fiatCurrenciesList} = fiatCurrenciesQueryAPI.useFetchCurrenciesListQuery();

    const [fetchFiatCourses] = fiatCurrenciesQueryAPI.useLazyFetchAllCoursesQuery();
    const [fetchCryptoCourses] = cryptoCurrenciesQueryAPI.useLazyFetchAllCoursesQuery();
    const [coursesData, setCoursesData] = useState<CurrencyCourseEntries>([]);
    const [filteredCoursesData, setFilteredCoursesData] = useState<CurrencyCourseEntries|null>(null);
    const [fetchError, setFetchError] = useState<string>('');
    const [searchValue, setSearchValue] = useState<string>('');
    const baseCurrency = useAppSelector(state => state.currencyReducer);

    useEffect(() => {
        if (cryptoOutCurrenciesList && fiatCurrenciesList && cryptoCoinsData) {
            const getFiatCourses = async (currencySymbol: string) => {
                const fiatCourses = await fetchFiatCourses(currencySymbol).unwrap();
                setCoursesData(fiatCourses);
            }
            const getCryptoCourses = async (currencySymbol: string) => {
                const cryptoCourses = await fetchCryptoCourses(currencySymbol).unwrap();
                setCoursesData(cryptoCourses);
            }
            const {
                cryptoCurrencies,
                fiatCurrencies
            } = pickBaseCurrencies(cryptoCoinsData, cryptoOutCurrenciesList, fiatCurrenciesList);
            const baseCurrencyIsFiat = fiatCurrencies.includes(baseCurrency.currency);
            const baseCurrencyIsCrypto = cryptoCurrencies.includes(baseCurrency.currency) && cryptoCoinsData.map(item => item.symbol.toUpperCase()).includes(baseCurrency.currency);
            if (baseCurrencyIsFiat) {
                try {
                    getFiatCourses(baseCurrency.currency);
                } catch (err) {
                    setFetchError('Some error occurred. It can be that APIs is overloaded with requests')
                }
            }
            if (baseCurrencyIsCrypto) {
                const baseCurrencyInfo = cryptoCoinsData.find(item => item.symbol.toUpperCase() === baseCurrency.currency);
                if (baseCurrencyInfo) {
                    try {
                        getCryptoCourses(baseCurrencyInfo.id);
                    } catch (err) {
                        setFetchError('Some error occurred. It can be that APIs is overloaded with requests')
                    }
                }
            }
        }
    }, [baseCurrency, cryptoOutCurrenciesList, fiatCurrenciesList, cryptoCoinsData, fetchCryptoCourses, fetchFiatCourses])

    const searchInputHandler = (searchString: string) => {
        setSearchValue(searchString);
        if (!!searchString){
            console.log('coursesData', coursesData);
            console.log('coursesData', coursesData.filter(item => item[0].includes(searchString.toUpperCase())));
            setFilteredCoursesData(coursesData.filter(item => item[0].includes(searchString.toUpperCase())))
        } else {
            setFilteredCoursesData(null);
        }
    }


    return (
        <Box
        sx={{
            backgroundColor:'#fff',
        }}
        >
            <h1>Courses page</h1>
            <h2>{baseCurrency.currency ? baseCurrency.currency : 'USD'} courses</h2>
            <StringInput inputValue={searchValue} placeholder='Search currency' changeHandler={searchInputHandler}/>
            <Stack spacing={4} sx={{pt:3, backgroundColor:'#E7EBF0'}} direction='column'>
                {(filteredCoursesData ?  filteredCoursesData : coursesData).map(item =>
                    <Item
                        sx={{margin: '0 auto'}}
                        key={item[0]}
                    >1
                        {baseCurrency.currency ? baseCurrency.currency : 'USD'} = {item[1]} {item[0]}
                    </Item>
                )}
            </Stack>
            {fetchError &&
                <Box
                    sx={{
                        backgroundColor:red[100],
                        fontSize:22,
                    }}
                >
                    {fetchError}
                </Box>}
        </Box>
    );
};

export default CoursesPage;