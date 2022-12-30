export const parseString = (str: string, baseCurrency?: string) => {
    const rawWords = str.split(' ');
    // Splits sting to an array of strings
    const wordsWithoutExtraSpaces = rawWords.filter(item => item !== ' ' && item.length > 0);
    // Removes extra spaces
    const wordsWithoutPunctuationMarks = wordsWithoutExtraSpaces.map(word => filterPunctuationMarks(word));
    // Cleans out punctuation marks
    const wordsWithoutNumbers = wordsWithoutPunctuationMarks.filter(word => isWord(word));
    // Separates numbers and words
    const numbers = wordsWithoutPunctuationMarks.filter(word => isNumber(word));
    // Picks a number
    if(numbers.length !== 1) {
        throw new Error('Amount error');
    }
    const threeDigitWords = wordsWithoutNumbers.filter(item => item.length === 3);
    // Picks only three-digit words because usually currency code is three-digits only
    if (threeDigitWords.length !== 2) {
        if(threeDigitWords.length === 1) {
            if(baseCurrency){
                return {
                    currencyIn: threeDigitWords[0],
                    currencyOut: baseCurrency.toLowerCase(),
                    amount: Number(numbers[0])
                }
            }
        }
        throw new Error('Currencies error');
    }
    return {
        currencyIn: threeDigitWords[0],
        currencyOut: threeDigitWords[1],
        amount: Number(numbers[0])
    }
}

const isWord = (word: string) => {
    if (typeof word !== "string") {
        return false
    }
    const letters = word.split('');
    return letters.every(letter => isNaN(Number(letter)))
}

const isNumber = (word: string) => {
    if (typeof word === 'number') {
        return true
    }
    if (typeof word !== "string") {
        return false
    }
    const letters = word.split('');
    return letters.every(letter => !isNaN(Number(letter)) && letter !== ' ')
}

const filterPunctuationMarks = (string: string) => {
    const stringWithoutPunctuationMarks = string.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    return stringWithoutPunctuationMarks.replace(/\s{2,}/g," ");
}