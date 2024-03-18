const mongoose = require("mongoose")
const TransactionSchema = new mongoose.Schema({
    sender:{
        type:String,
        ref:"User",
        required:true,
    },
    reciever:{
        type:String,
        ref:"User",
        required:true,
    },
    amount:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
});

const TransactionModel = mongoose.model("Transaction",TransactionSchema)
module.exports  =TransactionModel