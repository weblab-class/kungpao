const mongoose = require("mongoose");

const GoalSchema = new mongoose.Schema({
    googleid: String,
    content: String,
});

// compile model from schema
module.exports = mongoose.model("goal", GoalSchema);