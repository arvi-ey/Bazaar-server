const express = require('express');
const Router = express.Router();
const { PlaceOrder, GetAllOrders, GetOrder, UpdateOrder, GetSingleOrder } = require("../Controller/orderController")

Router.route('/placeorder')
    .post(PlaceOrder)

Router.route('/getorder/:id')
    .get(GetOrder)

Router.route('/updateorder/:id')
    .patch(UpdateOrder)

Router.route('/gettallorder')
    .get(GetAllOrders)

Router.route('/getsingleorder/:id')
    .get(GetSingleOrder)



module.exports = Router;