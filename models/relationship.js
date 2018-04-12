const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/slangy");


var relationshipSchema = new mongoose.Schema({
    user_id: [mongoose.Schema.Types.ObjectId],
    type: String,
    status: String
});


module.exports = mongoose.model("Relationship", relationshipSchema);