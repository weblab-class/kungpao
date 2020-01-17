const mongoose = require("mongoose");

const MoneySchema = new mongoose.Schema({
    googleid: String,
    money: Number,
});

// compile model from schema
module.exports = mongoose.model("money", MoneySchema);