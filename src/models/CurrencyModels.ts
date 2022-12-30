export interface ICurrencyCourse {
    [currencyIn: string] : {
        [currencyOut: string] : number
    }
}

export interface ICurrencyCourseQueryParams {
    currencyIn: string;
    currencyOut: string;
}

export type ICurrencyRecord = {
    id: string;
    symbol: string;
    name: string
}
//Сделано типом, чтобы можно было ссылаться на поля в форме <T>{[key:string]:T}


export interface IFiatCurrencyRecord  {
        "symbol": string;
        "name": string;
        "symbol_native": string;
        "decimal_digits": number;
        "rounding": number;
        "code": string;
        "name_plural": string;
    }


export interface IFiatCurrenciesList {
    data: {
        [key: string]: IFiatCurrencyRecord
    }
}

export interface IFiatCurrencyCourse {
    data: {
        [key: string]: number
    }
}

export type CurrencyCourseEntries = [string, number][]

export interface currencySymbols {
    baseCurrencies: string[];
    cryptoCurrencies: string[];
    fiatCurrencies: string[];
}

export interface ICryptoCoinDetailedData{
    id: string;
    symbol: string;
    name: string;
    market_data: {
        current_price: {
            [key: string]: number;
        }
    }
}