const express = require('express');
const Router = express.Router();

const { AddAddress, GetUserAddress, DeleteUserAddress, EditUserAddress } = require("../Controller/addressController")

Router.route('/addaddress')
    .post(AddAddress)

Router.route('/getuseraddress/:id')
    .get(GetUserAddress)

Router.route('/updateuseraddress/:id')
    .patch(EditUserAddress)
    .delete(DeleteUserAddress);

module.exports = Router;