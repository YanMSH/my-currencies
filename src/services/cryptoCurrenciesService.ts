import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {
    CurrencyCourseEntries, ICryptoCoinDetailedData,
    ICurrencyCourse,
    ICurrencyCourseQueryParams,
    ICurrencyRecord
} from "../models/CurrencyModels";

export const cryptoCurrenciesQueryAPI = createApi({
    reducerPath: 'currenciesAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.coingecko.com/api/v3/'
    }),
    tagTypes: ['Currency'],
    endpoints: (build) => ({
        fetchCurrenciesList: build.query<string[], void>({
            query: () => ({
                url: '/simple/supported_vs_currencies'
            }),
            transformResponse(data: string[]): Promise<string[]> | string[] {
                return data.map(item => item.toUpperCase())
            },
            providesTags: result => ['Currency']
        }),
        fetchCourse: build.query<number, ICurrencyCourseQueryParams>({
            query: (params: ICurrencyCourseQueryParams) => ({
                url: '/simple/price',
                params: {
                    ids: params.currencyIn,
                    vs_currencies: params.currencyOut
                }
            }),
            transformResponse(data: ICurrencyCourse): number {
                return Object.values(Object.values(data)[0])[0];
                //смотри интерфейс ICurrencyCourse
            },
        }),
        fetchAllCoins: build.query<ICurrencyRecord[], void>({
            query: () => ({
                url: '/coins/list'
            })
        }),
        fetchAllCourses: build.query<CurrencyCourseEntries, string>({
            query: (coinName:string) => ({
                url: `/coins/${coinName}`,
            }),
            transformResponse(data: ICryptoCoinDetailedData): CurrencyCourseEntries {
                return Object.entries(data.market_data.current_price)
            }
        })
    })
})