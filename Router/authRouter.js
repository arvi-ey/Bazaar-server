const express = require('express')
const Router = express.Router()
const { UserSignIn, UserSignUp, UserLogout } = require("../Controller/authController")
const { authenticate, verifyToken } = require("../Middleware/authMidleware")


Router.route('/signin')
    .post(UserSignIn)

Router.route('/signup')
    .post(UserSignUp)

Router.route('/checkauth')
    .post(authenticate)

Router.route('/logout')
    .post(UserLogout)

Router.route('/checkappauth')
    .get(verifyToken)


module.exports = Router