const mongoose = require("mongoose");

const HabitSchema = new mongoose.Schema({
    creator_id: String,
    content: String,
    isDone: Boolean,
});

// compile model from schema
module.exports = mongoose.model("habit", HabitSchema);