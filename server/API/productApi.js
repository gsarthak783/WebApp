const exp = require('express')
const productApp = exp.Router()

const expressAsyncHandler = require('express-async-handler')

//import req handlers from product controllers
const {getProducts, getProductByName, createProduct, updateProduct, deleteProduct} = require('../Controllers/productController')


//product CRUD

//get all products
productApp.get('/products',expressAsyncHandler(getProducts))

//get product by Id
productApp.get('/product/:username',expressAsyncHandler(getProductByName))

//create product
productApp.post('/product-create',expressAsyncHandler(createProduct))

//update product
productApp.put('/product-update',expressAsyncHandler(updateProduct))

//delete product
productApp.delete('/product-delete',expressAsyncHandler(deleteProduct))






module.exports = productApp;