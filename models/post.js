const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/slangy");

var postSchema = new mongoose.Schema({
    fu_id: mongoose.Schema.Types.ObjectId,
    fu_username: String,
    applicants : [mongoose.Schema.Types.ObjectId],
    teach_lang : String,
    learn_lang : String,
    topics: String,
    comment: String,
    status: String
});


module.exports = mongoose.model("Post", postSchema);