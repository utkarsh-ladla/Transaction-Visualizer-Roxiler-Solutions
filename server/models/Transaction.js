const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    dateOfSale: Date,
    category: String,
    isSold: Boolean,
});

module.exports = mongoose.model("Transaction", TransactionSchema);
