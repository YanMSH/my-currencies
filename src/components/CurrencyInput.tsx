import React, {FC} from 'react';

interface CurrencyInputProps {
    amount: number;
    currencies: string[] | undefined;
    selectedCurrency: string;
    onAmountChange: (amount: number) => void;
    onCurrencyChange: (currency: string) => void;
}


const CurrencyInput: FC<CurrencyInputProps> = (
    {
        amount,
        currencies,
        selectedCurrency,
        onAmountChange,
        onCurrencyChange
    }) => {
    return (
        <div>
            <input type="text" value={amount} onChange={(e) => {onAmountChange(Number(e.target.value))}}/>
            <select value={selectedCurrency} onChange={(e) => {onCurrencyChange(e.target.value)}}>
                {
                    currencies ?
                        currencies.map((currency) => <option value={currency} key={currency}>{currency}</option>)
                        :
                        <option>Error</option>
                }
            </select>
        </div>
    );
};

export default CurrencyInput;