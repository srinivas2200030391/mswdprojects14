const mongoose = require("mongoose")

const TransactionSchema = new mongoose.Schema({
    sender:{
        type:Object,
        ref:"User",
        required:true,
    },
    reciever:{
        type:Object,
        ref:"User",
        required:true,
    },
    amount:{
        type:Number,
        required:true,
    },
    date:{
        type:String,
        default:() => moment().tz('Asia/Kolkata').format('DD-MM-YYYY HH:mm:ss A'),
    },
});

const TransactionModel = mongoose.model("Transaction",TransactionSchema)
module.exports  =TransactionModel