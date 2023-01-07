module.exports = class ebserv{
    constructor({
        schema,
        schema_name,
        schema_dir
    })
    
    {
        this.schema = schema;
        this.schema_name = schema_name || 'document';
        this.schema_dir = schema_dir || '.';
    }
    
    model(){
        require("./model").createSchema(this.schema, this.schema_name, this.schema_dir);
    }
    
    quickRoute(){
        const {ROUTER, createRoutes, customRoute} = require("./router")
        createRoutes(this.schema_name, this.schema_dir)
    }

    addRoute(type, url, param){
        const {ROUTER, createRoutes, customRoute} = require("./router")
        customRoute(this.schema_name, this.schema_dir, type, url, param)
    }
}