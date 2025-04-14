const express = require('express')
const Router = express.Router()
const { AddProduct, UpdateProduct, DeleteProduct, Filteredproducts, GetAllProduct, GetSingleProduct, GetHomeProducts, GetAllProductByCategory, GetAllProductAdmin } = require("../Controller/productController")

Router.route('/addproduct')
    .post(AddProduct)

Router.route('/updateproduct/:id')
    .patch(UpdateProduct)
    .delete(DeleteProduct)

Router.route('/getproducts')
    .get(GetAllProduct)
Router.route('/filteredProduct')
    .get(Filteredproducts)
Router.route('/gethomeproducts')
    .get(GetHomeProducts)

Router.route('/getproduct/:id')
    .get(GetSingleProduct)

Router.route('/getproductcategory/:category')
    .get(GetAllProductByCategory)

Router.route('/getallproducts')
    .get(GetAllProductAdmin)

module.exports = Router