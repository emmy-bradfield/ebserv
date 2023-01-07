module.exports = class ebserv{
    constructor({
        schema,
        mongo_url,
        static_dir,
        static_file,
        port
    })
    
    {
        this.schema = schema;
        this.mongo_url = mongo_url;
        this.static_dir = static_dir;
        this.static_file = static_file;
        this.port = port;
    }
    
    model(){
        require("./model").createSchema(this.schema);
    }
    
    quickRoute(){
        const {ROUTER, createRoutes, customRoute} = require("./router")
        createRoutes()
    }

    addRoute(type, url, param){
        const {ROUTER, createRoutes, customRoute} = require("./router")
        customRoute(type, url, param)
    }

    serve(port = null){
        require("./server").server(this.mongo_url, this.static_dir, this.static_file, this.port);
    }

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