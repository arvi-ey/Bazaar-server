const express = require('express');
const Router = express.Router();
const { PlaceOrder, GetAllOrders, GetOrder, UpdateOrder } = require("../Controller/orderController")

Router.route('/placeorder')
    .post(PlaceOrder)

Router.route('/getorder/:id')
    .get(GetOrder)

Router.route('/updateorder/:id')
    .patch(UpdateOrder)

Router.route('/gettallorder')
    .get(GetAllOrders)

module.exports = Router;