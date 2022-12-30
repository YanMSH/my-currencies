import React, {FC} from 'react';
import {useAppDispatch} from "../hooks/redux-hooks";
import {currencySlice} from "../store/reducers/currencySlice";
import {NavLink} from "react-router-dom";
import {AppBar, Box, Link, MenuItem, Select, SelectChangeEvent} from "@mui/material";

interface HeaderProps {
    currenciesList: string[];
    isFetching: boolean;
    loadBaseCurrencies: () => void;
    selectDefaultValue: string;
}

const AppHeader: FC<HeaderProps> = ({currenciesList, isFetching, loadBaseCurrencies, selectDefaultValue}) => {
    const dispatch = useAppDispatch();

    const selectChangeHandler = (e: SelectChangeEvent) => {
        dispatch(currencySlice.actions.setBaseCurrency(e.target.value));
        localStorage.setItem('baseCurrency', e.target.value);
    }


    return (
        <AppBar position='static'>
            <Box
                sx={{
                    ml: 3,
                    mr: 3,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                <h2>My Currencies</h2>
                <Box sx={{
                    mt: 3,
                }}>
                    <Link color='white' variant='body1' underline='hover' component={NavLink} to={'/'}
                          sx={{m: '0 2rem'}}>Courses</Link>
                    <Link color='white' variant='body1' underline='hover' component={NavLink}
                          to={'/convert'}>Converter</Link>
                </Box>
                <Box sx={{mt: 1}}>
                    Your base currency:
                    <Select
                        onOpen={!!currenciesList.length ? undefined : () => loadBaseCurrencies()}
                        onChange={selectChangeHandler}
                        value={selectDefaultValue}
                    >
                        <MenuItem value={selectDefaultValue}>{selectDefaultValue}</MenuItem>
                        {currenciesList && currenciesList.map((currency) =>
                            <MenuItem
                                value={currency}
                                key={currency}
                            >
                                {currency}
                            </MenuItem>
                        )}
                        {isFetching && <MenuItem value={''}>...</MenuItem>}
                    </Select>
                </Box>
            </Box>

        </AppBar>
    );
};

export default AppHeader;