const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContSchema = new Schema({
    nombre: { type: String, required: true},
    email: { type: String, required: true},
    celular: { type: String, required: true}
});

const BaseCont = mongoose.model("BaseCont", ContSchema)

module.exports = BaseCont