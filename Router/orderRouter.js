const express = require('express');
const Router = express.Router();

const { PlaceOrder } = require("../Controller/orderController")

Router.route('/placeorder')
    .post(PlaceOrder)


module.exports = Router;