const express = require('express')

const routes = express.Router();

const {getAllProducts} =  require("./functions")

routes.route('/').get(getAllProducts)
module.exports = {routes}