module.exports = class ebserv{
    constructor({
        schema
        // routes
    })

    {
        this.schema = schema;
        // this.routes = routes;
    }

    model(){
        require("./model").createSchema(this.schema);
        // makeModel(this.schema)
    }
}