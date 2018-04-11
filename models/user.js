const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/slangy");

const passportLocalMongoose = require("passport-local-mongoose")

var userSchema = new mongoose.Schema({
    username: String,
    fullname: String,
    password: String,
    email: String,
    phone: String,
    gender: String,
    birth: String,
    languages: [String],
    image: String
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);