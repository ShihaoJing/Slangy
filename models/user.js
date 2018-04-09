const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/slangy");

var userSchema = new mongoose.Schema({
    name: String,
    password: String,
    email: String,
    phone: String,
    gender: String,
    birth: String,
    languages: [String]
});

module.exports = mongoose.model("User", userSchema);