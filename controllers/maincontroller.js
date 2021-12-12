const Product = require("../models/productmodel")

async function getproducts(req, res){
    const username = req.body.username
    const password = req.body.password

    Product.find({}, function(err, foundProducts){
        res.json({foundProducts:foundProducts});
    });
}

module.exports = {getproducts}