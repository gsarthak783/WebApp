const exp = require('express')
const cartApp = exp.Router()

const expressAsyncHandler = require('express-async-handler')

//import req handlers from product controllers
const {getCarts,getCartByUsername,createCart,updateCart,deleteCart} = require('../Controllers/cartController')



//product CRUD

//get all products
cartApp.get('/carts',expressAsyncHandler(getCarts))

//get product by Id
cartApp.get('/cart/:username',expressAsyncHandler(getCartByUsername))

//create product
cartApp.post('/cart-create',expressAsyncHandler(createCart))

//update product
cartApp.put('/cart-update',expressAsyncHandler(updateCart))

//delete product
cartApp.delete('/cart-delete',expressAsyncHandler(deleteCart))






module.exports = cartApp;