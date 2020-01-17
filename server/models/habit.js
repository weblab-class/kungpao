const mongoose = require("mongoose");

const HabitSchema = new mongoose.Schema({
    googleid: String,
    content: String,
});

// compile model from schema
module.exports = mongoose.model("habit", HabitSchema);