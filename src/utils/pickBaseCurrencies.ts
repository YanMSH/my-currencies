import {ICurrencyRecord} from "../models/CurrencyModels";

export const pickBaseCurrencies = (coinsList: ICurrencyRecord[], cryptoCurrencies: string[], fiatCurrencies: string[]) => {
    const cryptoVsCurrenciesWithoutFiat = cryptoCurrencies.filter(currency => !fiatCurrencies.includes(currency.toUpperCase()));
    const reversibleCryptos = coinsList.filter(coin => cryptoVsCurrenciesWithoutFiat.includes(coin.symbol.toUpperCase()));
    const cryptoSymbolsSet = new Set([...reversibleCryptos.map(coin => coin.symbol.toUpperCase())]);
    const baseCurrencies = fiatCurrencies.concat([...cryptoSymbolsSet]);
    return {baseCurrencies, fiatCurrencies, cryptoCurrencies: [...cryptoSymbolsSet]};
}