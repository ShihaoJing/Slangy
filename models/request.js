const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/slangy");

var requestSchema = new mongoose.Schema({
    fu: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    tu: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    rt: String,
    status: String
});

module.exports = mongoose.model("Request", requestSchema);