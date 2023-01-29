# Currency converter

Made as part of test task

You can find deploy [here](https://yanmsh-mycurrencies.netlify.app/)
![изображение](https://user-images.githubusercontent.com/89582326/215318801-3ec7e514-ce19-4d4e-a504-b506a596714d.png)
![изображение](https://user-images.githubusercontent.com/89582326/215318831-fbece016-bf03-4bf5-930e-4d6d8e470c77.png)

## APIs
Two separate public APIs for crypto and fiat currencies.
- **Crypto:** [CoinGecko](https://www.coingecko.com/en/api/documentation)
- **Fiat:** [FreeCurrencyAPI](https://freecurrencyapi.com/docs)

## Libraries
- Project built on **React** with **TypeScript**
- For state-management I've used **Redux-Toolkit**
- For API requests I've used **RTK-Query**
- I've also used **Material UI** for a nice look of application.
- There are also some tests for the string parser made on **Jest**.

## Pages and components
### Header
One header for all pages. In this header you can choose your *Base Currency*, that will be saved in the **localStorage**.

There are two pages in my SPA: **Courses** and **Convert**.
### Courses
On **Courses** page all the courses of chosen *Base Currency*. If your currency is fiat there will be only fiat courses. If it's crypto - there will be only crypto courses.
### Convert
On **Convert** page you can convert fiat and cryptocurrencies into crypto or fiat currency and vice versa. There are text input in which you can type:
> *15 usd in eth*

and it will show you how many Ethereum you can buy for 15 US dollars. You also can type one currency and amount like this: 
> '15 eur'

in this case app will show you how many base currencies you can buy for typed amount of money. In this particular case it will show you how many US dollars (default base currency) you can buy for 15 euros.

## Technical details
- All requests are done through RTK-Query. In some cases the data from both API is mixing transforming and processing. For example in the Header component your can choose either fiat either cryptocurrency because there are sending two requests to both APIs, in response I recieve two lists of objects or strings, that I transform and connect in the one set of unique currency symbols.

- All requests to CoinGecko API can seem a little complicated because API requires **ID** of input currency and **symbol** of output currency. And lists of available inputs and outputs are not the same. In this case everytime I make a requests to CoinGecko API I should request the list of all currencies, in which I should find my currency ID form symbol and only then send a request for currency courses.

- Both APIs are public so there are some restrictions - 5 requests per minute and 5000 requests per month.
