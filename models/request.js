const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/slangy");

var requestrSchema = new mongoose.Schema({
    sender: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    receiver: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    state: String
});

module.exports = mongoose.model("Request", requestrSchema);