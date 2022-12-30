import {parseString} from "./parseString";

test('Parses fiat as input and crypto as output', () => {
    expect(parseString('1 usd in eth')).toEqual({currencyIn: 'usd', currencyOut: 'eth', amount: 1})
})

test('Parses fiats as input and output', () => {
    expect(parseString('1 usd in eur')).toEqual({currencyIn: 'usd', currencyOut: 'eur', amount: 1})
})

test('Cleans out extra spaces', () => {
    expect(parseString('  1500  usd   in  btc  ')).toEqual({currencyIn: 'usd', currencyOut: 'btc', amount: 1500})
})

test('Parses only three digit words', () => {
    expect(parseString('9 gbp in a russian rub')).toEqual({currencyIn: 'gbp', currencyOut: 'rub', amount: 9})
})
