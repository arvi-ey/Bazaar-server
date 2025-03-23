const express = require("express")
const Router = express.Router()
const { CheckoutPayment, VerifyPayment } = require("../Controller/paymentController")

Router.route('/checkout-session')
    .post(CheckoutPayment)

Router.route('/verify-payment')
    .post(VerifyPayment)


module.exports = Router;