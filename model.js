const fs = require("fs")

const MONGOOSE = require("mongoose");
const {Schema, model} = MONGOOSE;

const writeSchema = (SCHEMA_JSON) => {
let CONTENT = `const MONGOOSE = require('mongoose'); \nconst {Schema, model} = MONGOOSE; \n\nconst documentSchema = new Schema(${SCHEMA_JSON})\n\nconst Document = model("Document", documentSchema)\nmodule.exports = {"Document": Document}`
    fs.writeFile(`./documentModel.js`, CONTENT, err => {
        if (err) console.log(err)
    })
};

exports.createSchema = function(SCHEMA_ARRAY){
    let STRING = "{"
    for (let i = 0; i < SCHEMA_ARRAY.length; i++) {
        STRING += `\n\t${SCHEMA_ARRAY[i]},`
    }
    STRING += "\n}"
    writeSchema(STRING)
}