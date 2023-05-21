import asyncHandler from "express-async-handler";
import Transaction  from "../models/transactionModel.js";
import Asset from "../models/assetModel.js";
import { calculateCost, calculateValue } from "../middlewares/analytics.js";


// update user assets for every transaction made  
export const updateAssets = asyncHandler( async (id) => {
    const transactions = await Transaction.find({user_id: id});
    const lastTransaction = transactions[transactions.length - 1];
    const coin_symbol = lastTransaction.target_coin.coin_symbol;
    const inAssets = await Asset.findOne({user_id: id, coin_symbol: coin_symbol});
    const quantity = lastTransaction.quantity;
    let successfulUpdate = false;
    if (lastTransaction.action === "buy") {
        if (inAssets === null) {
            successfulUpdate = await Asset.create({ // create new asset 
                user_id: id,
                coin_symbol: coin_symbol,
                coin_id: lastTransaction.target_coin.coin_id,
                quantity: quantity
            });
        } else { // in assets (update -> +)
            successfulUpdate = await Asset.findByIdAndUpdate(
                inAssets._id,
                {$inc: {quantity: quantity}}, 
                {new: true}
            );
        }
    } else { // "sell"
        if (inAssets === null || (inAssets.quantity - quantity < 0)) {
            console.log("insufficient assets to sell")
        } else {
            successfulUpdate = await Asset.findByIdAndUpdate( // (update -> -)
                inAssets._id,
                {$inc : {quantity: -quantity}},
                {new: true}
            );
        }
    }
    if (successfulUpdate) {
        console.log("assets are updated");
    } else {
        console.log("assets not updated")
    }
});


// display user assets and return valuation 
export const userAssets = asyncHandler(async (req, res) => {
    const transactions = await Transaction.find({user_id: req.user.id});
    const {target} = req.body
    const allAssets = await Asset.find({user_id: req.user.id});
    const valuation = await calculateValue(allAssets, target);
    const cost = await calculateCost(transactions, target);
    res.status(200).json({
        assets: allAssets,
        total_value: `${valuation} in ${target}`,
        cost_of_purchase: `${cost} in ${target}`
    });
})
