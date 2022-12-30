import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {
    ICurrencyCourseQueryParams,
    IFiatCurrenciesList,
    IFiatCurrencyCourse,
    CurrencyCourseEntries

} from "../models/CurrencyModels";

export const fiatCurrenciesQueryAPI = createApi({
    reducerPath: 'fiatCurrenciesService',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.freecurrencyapi.com/v1/'
    }),
    tagTypes: ['FiatCurrency'],
    endpoints: (build) => ({
        fetchCurrenciesList: build.query<string[], void>({
            query: () => ({
                url: '/currencies',
                params: {
                    apikey: process.env.REACT_APP_API_KEY,
                }
            }),
            transformResponse(data: IFiatCurrenciesList): string[] | Promise<string[]> {
                return Object.keys(data.data)
            },
        }),
        fetchCourse: build.query<number, ICurrencyCourseQueryParams>({
            query: (params: ICurrencyCourseQueryParams) => ({
                url: '/latest/',
                params: {
                    base_currency: params.currencyIn.toUpperCase(),
                    currencies: params.currencyOut.toUpperCase(),
                    apikey: process.env.REACT_APP_API_KEY,
                }
                //request ends up with error if currency code in lower case
            }),
            transformResponse(data: IFiatCurrencyCourse): number {
                return Object.values(data.data)[0];
                //see IFiatCurrencyModel
            },
        }),
        fetchAllCourses: build.query<CurrencyCourseEntries, string>({
            query: (baseCurrency: string) => ({
                url:'/latest/',
                    params: {
                        base_currency: baseCurrency.toUpperCase(),
                        apikey:process.env.REACT_APP_API_KEY,
                }
            }),
            transformResponse(data: IFiatCurrencyCourse): CurrencyCourseEntries {
                return Object.entries(data.data);
            }
        })
    })
})