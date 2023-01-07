/**
 * @module router.js
 * @exports ROUTER an express.Router() object
 * @exports createRoutes a function to create a set of 5 default/pre-determined routes
 * @exports customRoute a function to create a custom route
 */
const fs = require("fs");

const AXIOS = require("axios");
const ROUTER = require('express').Router();
const {Document} = require("./documentModel")

/**
 * @function createRoutes creates five default express.Router() routes for basic CRUD functionality
 */
const createRoutes = () => {

    /**
     * @summary CREATE (POST)
     */
    ROUTER.route('/create').post((req, res) => {
        let OBJECT = req.body;
        const NEW_OBJECT = new Document(OBJECT);
        NEW_OBJECT.save().then(() => res.json(NEW_OBJECT)).catch((err) => res.json(err))
    })

    /**
     * @summary READ (GET)
     */
    ROUTER.route('/read').get((req, res) => {
        Document.find().then((documents) => res.json(documents)).catch((err) => res.json(err))
    })

    ROUTER.route('/read/:_id').get((req, res) => {
        Document.findById(req.params._id).then((document) => res.json(document)).catch((err) => res.json(err))
    })

    /**
     * @summary UPDATE (PUT/POST)
     */
    ROUTER.route('/update/:_id').post((req, res) => {
        Document.findByIdAndUpdate({'_id':req.params._id}, req.params.body).then(() => res.json(true)).catch((err) => res.json(err))
    })

    /**
     * @summary DELETE (DELETE)
     */
    ROUTER.route('/delete/:_id').delete((req, res) => {
        Document.findByIdAndDelete(req.params._id).then(() => res.json(true)).catch((err) => res.json(err))
    })
}

/**
 * Creates a customer route given the type of request, the url for the route, and a parameter (optional)
 * 
 * @param {String} TYPE the type of HTTP reuqest to make. Can be 'post', 'get', 'put', or 'delete'
 * @param {String} ROUTE_URL the route to direct the HTTP request to
 * @param {String} PARAM only required for readOne, update, and delete; the attribute by which to match any given document to 
 */
const customRoute = (TYPE, ROUTE_URL, PARAM = null) => {
    switch (TYPE){
        case 'post':
            ROUTER.route(ROUTE_URL).post((req, res) => {
                let OBJECT = req.body
                const NEW_OBJECT = new Document(OBJECT);
                NEW_OBJECT.save().then(() => res.json(NEW_OBJECT)).catch((err) => res.json(err))
            });
            break;
        case 'get':
            if (PARAM) {
                ROUTER.route(`${ROUTE_URL}/:${PARAM}`).get((req, res) => {
                    Document.findOne({PARAM : req.params.PARAM}).then((document) => res.json(document)).catch((err) => res.json(err))
                })
            } else {
                ROUTER.route(ROUTE_URL).get((req, res) => {
                    Document.find().then((documents) => res.json(documents)).catch((err) => res.json(err))
                })
            };
            break;
        case 'put':
            if (PARAM){
                ROUTER.route(ROUTE_URL).post((req, res) => {
                    Document.updateOne({PARAM: req.params.PARAM}, req.body).then(() => res.json(true)).catch((err) => res.json(err))
                })
            } else {throw new Error("MissingParamError: A parameter is required for put functions")};
            break;
        case 'delete':
            if (PARAM){
                ROUTER.route(ROUTE_URL).delete((req, res) => {
                    Document.findOneAndDelete({PARAM:req.params.PARAM}).then(() => res.json(true)).catch((err) => res.json(err))
                })
            } else {throw new Error("MissingParamError: A parameter is required for delete functions")};
            break;
        default:
            console.error("InvalidRouteError: Route type must be one of 'post', 'get', 'put', or 'delete'");
            break;
    }
}

module.exports = {ROUTER, createRoutes, customRoute};