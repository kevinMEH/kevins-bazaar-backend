const express = require("express");

const { getDatabase } = require("../database/connection")

const routes = express.Router();

routes.route("/api/products").get(async (request, response) => {
    const collection = getDatabase().collection("products");
    
    const queryPage = parseInt(request.query.page + ""); // Sanitize?
    const page = queryPage > 0 ? queryPage : 1; // Maybe additional checks?
    
    const filter = request.query.filter + ""; // TODO: Sanitize? Important!!!
    const options = filter !== "undefined" ? { name: { $regex: filter, $options: "i" }} : {}; // Ignore case
    
    // No desc to save data (Because desc isn't needed for catalog)
    collection.find(options, { projection: { _id: 0, desc: 0 } }).skip((page - 1) * 6).limit(6).toArray((error, result) => {
        if(error) {
            response.status(502).send("Error fetching products.");
        } else {
            // [] or [products]
            response.json(result);
        }
    })
});

routes.route("/api/product/:productURL").get(async (request, response) => {
    const collection = getDatabase().collection("products");
    const productURL = request.params.productURL;
    
    collection.findOne({ url: productURL }, { projection: { _id: 0 } }, (error, result) => {
        if(error) {
            response.status(502).send("Error fetching product " + productURL + ".");
        } else {
            // null or product
            response.json(result);
        }
    })
})

module.exports = routes;