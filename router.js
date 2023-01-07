const fs = require("fs");

const AXIOS = require("axios");
const ROUTER = require('express').Router();
const {Document} = require("./documentModel")

const createRoutes = () => {

    ROUTER.route('/create').post((req, res) => {
        let OBJECT = req.body;
        const NEW_OBJECT = new Document(OBJECT);
        NEW_OBJECT.save().then(() => res.json(NEW_OBJECT)).catch((err) => res.json(err))
    })

    ROUTER.route('/read').get((req, res) => {
        Document.find().then((documents) => res.json(documents)).catch((err) => res.json(err))
    })

    ROUTER.route('/read/:_id').get((req, res) => {
        Document.findById(req.params._id).then((document) => res.json(document)).catch((err) => res.json(err))
    })

    ROUTER.route('/update/:_id').post((req, res) => {
        Document.findByIdAndUpdate({'_id':req.params._id}, req.params.body).then(() => res.json(true)).catch((err) => res.json(err))
    })

    ROUTER.route('/delete/:_id').delete((req, res) => {
        Document.findByIdAndDelete(req.params._id).then(() => res.json(true)).catch((err) => res.json(err))
    })
}

const customRoute = (Document, TYPE, ROUTE_URL, PARAM = null) => {
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