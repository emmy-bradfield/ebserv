/**
 * @module server.js
 * @exports server a function to connect to the database and serve the front end
 */
const EXPRESS = require("express");
const APP = EXPRESS();
const CORS = require("cors");
const PATH = require('path');
require("dotenv").config();

/**
 * 
 * Connect to the MongoDB/Atlas Cloud Database and serve a static (html) file as the frontend
 * 
 * @param {*} MONGO_URL the url to the Mongo Cloud Database
 * @param {*} STATIC_DIR the (relative) path to the static front-end file (usually index.html)
 * @param {*} STATIC_FILE the static file to host
 * @param {*} PORT optional; the port on which to host the server
 */
exports.server = (MONGO_URL, STATIC_DIR, STATIC_FILE, PORT = null) => {
    let APP_PORT;
    process.env.PORT ? APP_PORT = process.env.PORT : PORT ? APP_PORT = PORT : APP_PORT = 4000;
    APP.use(EXPRESS.json())
    APP.use(CORS())
    
    const {ROUTER, createRoutes, customRoute} = require("./router")
    const MONGOOSE = require("mongoose")
    
    APP.use(`/`, ROUTER)

    const EXPRESS_ROUTER = EXPRESS.Router()

    MONGOOSE.connect(MONGO_URL, {useNewUrlParser: true}).then(() => console.log("Mongoose Connected")).catch((err) => console.error(err))
    const CONNECTION = MONGOOSE.connection;
    CONNECTION.once("open", function(){
        console.log("MongoDB Connection Successful")
    })

    APP.use(EXPRESS.static(PATH.resolve(__dirname, STATIC_DIR)))
    APP.get('*', (req, res) => {
        res.sendFile(PATH.resolve(__dirname, STATIC_DIR, STATIC_FILE))
    })
    
    let SERVER = APP.listen(APP_PORT, (err) => {
        if (err) {console.log(err)}
        else {console.log(`Listening on port ${APP_PORT}`)}
    });
}