const EXPRESS = require("express");
const APP = EXPRESS();
const CORS = require("cors");
const PATH = require('path');
require("dotenv").config();

exports.server = (MONGO_URL, STATIC_DIR, STATIC_FILE, PORT = null) => {
    let APP_PORT;
    let DIR = process.cwd() + STATIC_DIR;
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
        res.sendFile(PATH.resolve(__dirname, DIR, STATIC_FILE))
    })
    
    let SERVER = APP.listen(APP_PORT, (err) => {
        if (err) {console.log(err)}
        else {console.log(`Listening on port ${APP_PORT}`)}
    });
}