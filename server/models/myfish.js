const mongoose = require("mongoose");

//define a message schema for the database
const MyFishSchema = new mongoose.Schema({
    type: String,
    owner_id: String,
});

// compile model from schema
module.exports = mongoose.model("myfish", MyFishSchema);
