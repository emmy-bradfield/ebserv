const fs = require("fs")

const MONGOOSE = require("mongoose");
const {Schema, model} = MONGOOSE;

const writeSchema = (SCHEMA_JSON, SCHEMA_NAME , SCHEMA_PATH) => {
let CONTENT = `const MONGOOSE = require('mongoose'); \nconst {Schema, model} = MONGOOSE; \n\nconst ${SCHEMA_NAME} = new Schema(${SCHEMA_JSON})`
    fs.writeFile(`${SCHEMA_PATH}${SCHEMA_NAME}.js`, CONTENT, err => {
        if (err) console.log(err)
    })
};

exports.createSchema = function(SCHEMA_ARRAY, SCHEMA_NAME = 'documentModel', SCHEMA_PATH = './'){
    let STRING = "{"
    for (let i = 0; i < SCHEMA_ARRAY.length; i++) {
        STRING += `\n\t${SCHEMA_ARRAY[i]},`
    }
    STRING += "\n}"
    writeSchema(STRING, SCHEMA_NAME, SCHEMA_PATH)
}