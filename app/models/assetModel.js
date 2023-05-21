import mongoose from "mongoose";
 
const assetSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    coin_symbol: {
        type: String,
        required: true
    },
    coin_id: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true
    }
})

assetSchema.index({ coin_id: 1, user_id: 1 }, { unique: true });


export default (mongoose.model("Asset", assetSchema));