const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContSchema = new Schema({
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    email: { type: String, required: true}
});

const BaseCont = mongoose.model("BaseCont", ContSchema)

module.exports = BaseCont