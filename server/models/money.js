const mongoose = require("mongoose");

const MoneySchema = new mongoose.Schema({
    // googleid: String,
    creator_id: String,
    money: Number,
    name: String,
});

// compile model from schema
module.exports = mongoose.model("money", MoneySchema);