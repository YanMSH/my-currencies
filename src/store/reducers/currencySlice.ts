import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface CurrencyState {
    currency: string;
}

const initialState = {
    currency: 'USD'
}

export const currencySlice = createSlice({
    name: 'baseCurrency',
    initialState,
    reducers: {
        setBaseCurrency(state: CurrencyState, action: PayloadAction<string>) {
            state.currency = action.payload;
        }
    },
})

export default currencySlice.reducer;