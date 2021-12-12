const express=require("express");
const app = express.Router()
const {getproducts} = require("../controllers/maincontroller")

app.get("/getproducts", getproducts)

module.exports = app