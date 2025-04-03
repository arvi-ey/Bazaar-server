const express = require("express")
const Router = express.Router()
const { AddUser, UpdateUser, GetUser, UploadImage } = require("../Controller/userController")

Router.route('/adduser')
    .post(AddUser)

Router.route('/getuser/:id')
    .get(GetUser)

Router.route('/getallUser')
    .get()

Router.route('/updateuser/:id')
    .patch(UpdateUser)
Router.route("/updateuserimage/:id")
    .patch(UploadImage)

module.exports = Router