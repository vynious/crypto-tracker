import mongoose from "mongoose";

const transactionSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    target_coin : {
        coin_symbol: {
            type: String,
            required: true, 
        },
        coin_id: {
            type: String,
            required: true,
        }
    },
    action: {
        type: String,
        required: true
    },  
    quantity: {
        type: Number,
        required: true
    },
    fees: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    transaction_currency : {
            unit_symbol: {
                type: String,
                required: true
            },
            unit_id: {
                type: String,
                required: false
            },
            type: {
                type: String,
                required: true
            },
    },
    
    

}, {timestamps: true});


export default (mongoose.model("Transaction", transactionSchema));

