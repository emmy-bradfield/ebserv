/**
 * @module model.js
 * @exports createSchema() function for creating a mongoose.Schema()
 * 
 * Defines a mongoose.Schema model given an array of key-value pairs and writes the resulting model to another file to be called as needed
 */

const fs = require("fs")

const MONGOOSE = require("mongoose");
const {Schema, model} = MONGOOSE;

/**
 * Creates a new mongoose.Schema() from @param SCHEMA_JSON and writes the code define and export the model to the file documentModel.js
 * 
 * @param {String} SCHEMA_JSON A stringified JSON Object containing key : value pairs of attributes of the document 
 */
const writeSchema = (SCHEMA_JSON) => {
let CONTENT = `const MONGOOSE = require('mongoose'); \nconst {Schema, model} = MONGOOSE; \n\nconst documentSchema = new Schema(${SCHEMA_JSON})\n\nconst Document = model("Document", documentSchema)\nmodule.exports = {"Document": Document}`
    fs.writeFile(`./documentModel.js`, CONTENT, err => {
        if (err) console.log(err)
    })
};

/**
 * Creates a stringified JSON object based on @param SCHEMA_ARRAY and passes it to the writeSchema() function 
 * 
 * @param {Array} SCHEMA_ARRAY An array containing key : value pairs as strings, each describing an attribute of the document as name : type
 */
exports.createSchema = function(SCHEMA_ARRAY){
    let STRING = "{"
    for (let i = 0; i < SCHEMA_ARRAY.length; i++) {
        STRING += `\n\t${SCHEMA_ARRAY[i]},`
    }
    STRING += "\n}"
    writeSchema(STRING)
}