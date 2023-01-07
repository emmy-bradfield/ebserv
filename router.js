const fs = require("fs");

const AXIOS = require("axios");
const { resolveAny } = require("dns");
const { Model } = require("mongoose");
const ROUTER = require('express').Router();

const createRoutes = (SCHEMA_NAME, SCHEMA_PATH) => {
    const {Model} = require(`${SCHEMA_PATH}/${SCHEMA_NAME}Model.js`)

    ROUTER.route('/create').post((req, res) => {
        let OBJECT = req.body;
        const NEW_OBJECT = new Model(OBJECT);
        NEW_OBJECT.save().then(() => res.json(NEW_OBJECT)).catch((err) => res.json(err))
    })

    ROUTER.route('/read').get((req, res) => {
        Model.find().then((documents) => res.json(documents)).catch((err) => res.json(err))
    })

    ROUTER.route('/read/:_id').get((req, res) => {
        Model.findById(req.params._id).then((document) => res.json(document)).catch((err) => res.json(err))
    })

    ROUTER.route('/update/:_id').post((req, res) => {
        Model.findByIdAndUpdate({'_id':req.params._id}, req.params.body).then(() => res.json(true)).catch((err) => res.json(err))
    })

    ROUTER.route('/delete/:_id').delete((req, res) => {
        Model.findByIdAndDelete(req.params._id).then(() => res.json(true)).catch((err) => res.json(err))
    })
}

const customRoute = (SCHEMA_NAME, SCHEMA_PATH, TYPE, ROUTE_URL, PARAM = null) => {
    const {Model} = require(`${SCHEMA_PATH}/${SCHEMA_NAME}Model.js`)
    switch (TYPE){
        case 'post':
            ROUTER.route(ROUTE_URL).post((req, res) => {
                let OBJECT = req.body
                const NEW_OBJECT = new Model(OBJECT);
                NEW_OBJECT.save().then(() => res.json(NEW_OBJECT)).catch((err) => res.json(err))
            });
            break;
        case 'get':
            if (PARAM) {
                ROUTER.route(`${ROUTE_URL}/:${PARAM}`).get((req, res) => {
                    Model.findOne({PARAM : req.params.PARAM}).then((document) => res.json(document)).catch((err) => res.json(err))
                })
            } else {
                ROUTER.route(ROUTE_URL).get((req, res) => {
                    Model.find().then((documents) => res.json(documents)).catch((err) => res.json(err))
                })
            };
            break;
        case 'put':
            if (PARAM){
                ROUTER.route(ROUTE_URL).post((req, res) => {
                    Model.updateOne({PARAM: req.params.PARAM}, req.body).then(() => res.json(true)).catch((err) => res.json(err))
                })
            } else {throw new Error("MissingParamError: A parameter is required for put functions")};
            break;
        case 'delete':
            if (PARAM){
                ROUTER.route(ROUTE_URL).delete((req, res) => {
                    Model.findOneAndDelete({PARAM:req.params.PARAM}).then(() => res.json(true)).catch((err) => res.json(err))
                })
            } else {throw new Error("MissingParamError: A parameter is required for delete functions")};
            break;
        default:
            console.error("InvalidRouteError: Route type must be one of 'post', 'get', 'put', or 'delete'");
            break;
    }
}

module.exports = {ROUTER, createRoutes, customRoute};