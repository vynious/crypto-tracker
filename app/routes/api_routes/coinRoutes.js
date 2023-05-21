import express from "express";
import { validateToken } from "../../middlewares/validationCheck.js";
import { buyCoins, sellCoins, getCoins, searchCoin, topCoins } from "../../controllers/coinController.js";
import { updateAssets } from "../../controllers/assetController.js";

const coin = express.Router();

// all requests made to coin-related apis must be validated with their token
coin.post("/", validateToken, getCoins);
coin.post("/search/:id", validateToken, searchCoin);
coin.post("/top", validateToken, topCoins);
coin.post("/:id/buy", validateToken, buyCoins, updateAssets);
coin.post("/:id/sell", validateToken, sellCoins, updateAssets);


export {coin as default};