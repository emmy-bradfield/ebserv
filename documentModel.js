const MONGOOSE = require('mongoose'); 
const {Schema, model} = MONGOOSE; 

const documentSchema = new Schema({
	_id: Number,
	Name: String,
	Email: String,
	Age: Number,
})

const Document = model("Document", documentSchema)
module.exports = {"Document": Document}