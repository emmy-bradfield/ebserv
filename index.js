/**
 * @class ebserve
 * @exports ebserve
 */
module.exports = class ebserve{

    /**
     * @constructor
     * 
     * @param {Array} schema the schema to model; an array of key:value pairs
     * @param {String} mongo_url the url to connect with a cloud mongo DB
     * @param {String} static_dir path to a static .html file to serve
     * @param {String} static_file the static .html file to serve
     * @param {Number} port (optional) the port on which to listen
     */
    constructor({
        schema,
        mongo_url,
        static_dir,
        static_file,
        port = null,
    })
    
    {
        this.schema = schema;
        this.mongo_url = mongo_url;
        this.static_dir = static_dir;
        this.static_file = static_file;
        this.port = port;
    }
    
    /**
     * @function model calls @function createSchema from @module model.js
     */
    model(){
        require("./model").createSchema(this.schema);
    }
    
    /**
     * @function quickRoute calls @function createRoutes from @module router.js
     */
    quickRoute(){
        const {ROUTER, createRoutes, customRoute} = require("./router")
        createRoutes()
    }

    /**
     * @function addRoute calls @function customRoute from @module router.js
     * 
     * @param {String} type the type of HTTP request to make
     * @param {String} url the url to route the request to
     * @param {String} param the paramter on which to match and lookups (required only for readOne, update, and delete requests)
     */
    addRoute(type, url, param){
        const {ROUTER, createRoutes, customRoute} = require("./router")
        customRoute(type, url, param)
    }

    /**
     * @function serve calls @function server from @module server.js
     * 
     * @param {Number} port (optional) the port on which to host the server
     */
    serve(port = null){
        require("./server").server(this.mongo_url, this.static_dir, this.static_file, port);
    }

    /**
     * @function quickstart calls @function model, @function quickRoute, and @function serve
     * 
     * quickly setup and start serving with defaults
     */
    quickstart(){
        console.log("Server Quickstart:\nGenerating Schema")
        this.model();
        console.log("Schema Generated\nGenerating Routes")
        this.quickRoute();
        console.log("Routes Generated\nStarting Server")
        this.serve();
        console.log("\n\nQuickstart Finished Setup")
    }
}