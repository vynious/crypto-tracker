import asyncHandler from "express-async-handler";
import Transaction from "../models/transactionModel.js";
import axios from "axios";
import Asset from "../models/assetModel.js";
import { updateAssets } from "./assetController.js";



// display all coins for when searching
export const getCoins = asyncHandler( async (req, res) => {
    const allCoinsUrl = "https://api.coingecko.com/api/v3/coins/list";
    const result = await axios.get(allCoinsUrl)
                        .then(res => {
                            return res.data;
                        })
                        .catch(err => {
                            res.status(401);
                            throw new Error(err.response.statusText);
                        });
    if (result) {
        res.status(200).json({result: result});
        // do more with json response 
    } else {
        res.status(404);
        throw new Error("not found");
    }
})


// search for specific coins 
export const searchCoin = asyncHandler( async (req, res) => {
    let id = req.params.id;
    const coinUrl = `https://api.coingecko.com/api/v3/coins/${id}`;
    const coinDetail = await axios.get(coinUrl)
                                .then(res => {
                                    return res.data;
                                })
                                .catch(err => {
                                    res.status(401);
                                    throw new Error(err.response.statusText);
                                })
    if (coinDetail) {
        res.status(200).json({result: coinDetail});
        // do more with json response 
    } else {
        res.status(404);
        throw new Error("not found");
    }

})

// display the top 7 coins (when doing search bar)
export const topCoins = asyncHandler( async (req, res) => {
    const coinUrl = "https://api.coingecko.com/api/v3/search/trending";
    const coinsDetail = await axios.get(coinUrl)
                    .then(res => {
                        return res.data.coins;
                    })
                    .catch(err => {
                        res.status(401);
                        throw new Error(err.response.statusText);
                    });

    if (coinsDetail) {
        res.status(200).json({result: coinsDetail});
    } else {
        res.status(404);
        throw new Error("not found");
    }
})

// add coins to assets

const calculate = async (price, quantity) => {
    let cost = parseFloat(price) * parseFloat(quantity);
    return cost;
};

export const buyCoins = asyncHandler(async (req, res) => {
    console.log(req.user);
    const id = req.params.id;
    const coinUrl = `https://api.coingecko.com/api/v3/coins/${id}`;
    const {quantity, fees, unit, unit_name, type} = req.body;
    console.log(req.body)
    const coinDetail = await axios.get(coinUrl)
                            .then(res => {
                                return res.data;
                            })
                            .catch(err => {
                                res.status(401);
                                throw new Error(err.response.statusText);
                            })
    if (coinDetail) {
        const price = coinDetail.market_data.current_price[unit];
        const totalCost = await calculate(price, quantity);
        const transaction = await Transaction.create({
            user_id: req.user.id,
            target_coin: {
                coin_symbol: coinDetail.symbol,
                coin_id: id
            }, 
            action: "buy",
            quantity: quantity,
            fees: fees,
            total: totalCost,
            transaction_currency: {
                unit_symbol: unit,
                unit_id: unit_name,
                type: type,
            }
        });
        updateAssets(req.user.id);
        res.status(201).json(transaction);
    }
})


export const sellCoins = asyncHandler( async (req, res) => {
    // check current assets if got coin then can sell. 
    const id = req.params.id;
    const inAssets = await Asset.findOne({user_id: req.user.id, coin_id: id});
    // console.log(inAssets);
    const {quantity, fees, unit, unit_name, type} = req.body;
    if (inAssets && (inAssets.quantity - quantity) >= 0) {  
        const coinUrl = `https://api.coingecko.com/api/v3/coins/${id}`;
        const coinDetail = await axios.get(coinUrl)
                                .then(res => {
                                    return res.data;
                                })
                                .catch(err => {
                                    res.status(401);
                                    throw new Error(err.response.statusText);
                                })
        if (coinDetail) {
            const price = coinDetail.market_data.current_price[unit];
            const totalCost = await calculate(price, quantity);
            const transaction = await Transaction.create({
                user_id: req.user.id,
                target_coin: {
                    coin_symbol: coinDetail.symbol,
                    coin_id: id
                }, 
                action: "sell",
                quantity: quantity,
                fees: fees,
                total: totalCost,
                transaction_currency: {
                    unit_symbol: unit,
                    unit_id: unit_name,
                    type: type,
                }
            });
            updateAssets(req.user.id);
            res.status(201).json(transaction);
        } 
    } else {
        res.status(403)
        throw new Error("insufficient assets to sell");
    }

})