import {ICurrencyRecord} from "../models/CurrencyModels";

export const findCoinId = (symbol: string, data: ICurrencyRecord[] | undefined): string | null => {
        if(!data) {
                throw new Error('No coins data!')
        }
        const coinRecord = data.find(item => item.symbol === symbol);
        if(!coinRecord) {
                throw new Error('Cannot find a coin')
        }
        return coinRecord.id
}