import asyncHandler from "express-async-handler";
import axios from "axios";


// helper 
const btcExchangeRate = asyncHandler(async (currentCurrency) => {
    const rateUrl = "https://api.coingecko.com/api/v3/exchange_rates";
    const btcRate = await axios.get(rateUrl)
                                .then(res => {
                                    return res.data.rates[currentCurrency].value;
                                })
                                .catch(err => {
                                    console.log(err.response);
                                })
                                
    return btcRate;
})

// main
// current -> btc -> target;
export const currencyConversion = asyncHandler(async (value, current, target) => {
    const rateInBtc = await btcExchangeRate(current);
    const conversionUrl = `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=${target}`;
    const convertValue = await axios.get(conversionUrl)
                                        .then(res => {
                                            return res.data.bitcoin[target];
                                        })
                                        .catch(err => {
                                            console.log(err.response.statusText);
                                        })

    const convertedValue = await convertValue;
    return (value/rateInBtc) * convertedValue;
});


