import asyncHandler from "express-async-handler";
import { currencyConversion } from "./currencyConversion.js";
import axios from "axios";


// helper function
// price of crypto at given timestamp. 
const cryptoPurchasedPrice = asyncHandler ( async (value, timestamp, current,  target) => {
    const url = `https://api.coingecko.com/api/v3/coins/${current}/history?date=${timestamp}`;
    const result = await axios.get(url)
                            .then(res => {
                                return res.data.market_data.current_price[target];
                            })
                            .catch(err => {
                                console.log(err.response.statusText);
                            }) 
    return await result * value;
})

// helper function
// date parser to string
const parseDate = async (date) => {
    let month = String(date.getMonth()+1);
    if (month.length === 1) {
        month = "0" + month;
    }
    return  String(date.getDate()) + "-" + month + "-" + String(date.getFullYear())
}

// main function
// returns the cost of purchasing based on the date of purchase
export const calculateCost = asyncHandler( async(transactions, target) => {
    let valuation = 0;
    for (const elem of [transactions]) {
        for (const trans of elem) {
                if (trans.type === "crypto") {
                    const current = trans.unit_name;
                    const timestamp = await parseDate(trans.createdAt);
                    if (trans.action === "buy") {
                        valuation += await cryptoPurchasedPrice(trans.total, timestamp, current, target);
                    } else {
                        valuation -= await cryptoPurchasedPrice(trans.total, timestamp, current, target);
                    }
                    
                } else {
                    const price = await currencyConversion(trans.total, trans.transaction_currency.unit_symbol, target);
                    if (trans.action === "buy") {
                        valuation += price;
                    } else {
                        valuation -= price;
                    }
                }
            }
        }
    return valuation;
})


// main function
// return current value of purchased based on realtime data 
export const calculateValue = asyncHandler(async (allAssets, target) => {
    let valuation = 0;
    for (const asset of allAssets) {
            valuation += await currencyConversion(asset.quantity, asset.coin_symbol, target);
        }
    return valuation;        
});

