//import mongoose
const mongoose = require('mongoose')

require('dotenv').config()

const DB_URL = process.env.ATLAS_DB_URL;

//connect to db
mongoose.connect(DB_URL)
.then(()=> console.log("DB connection success"))
.catch(err => console.log("Error in db connect", err) )

//create user schema for registration
const userSchema = new mongoose.Schema({
    userType:String,
    username:{
        type:String,
        required:true,
        minLength:[4, "Password not long enough"]
        
    },
    email:String,
    password:{
        type:String,
        
    },
    address:String,
    profileImageUrl:String

})
//create seller schema for registration
const sellerSchema = new mongoose.Schema({
    userType:String,
    username:{
        type:String,
        required:true,
        minLength:4
    },
    email:String,
    password:{
        type:String
    },
    sellername:String,
    profileImageUrl:String

})
//create product schema for registration
const productSchema = new mongoose.Schema({
    productId:String,
    productName:{
        type:String,
        
    },
    productPrice:String,
    productDescription:{
        type:String,
        
    },
    sellername:String,
    username:String,

})
//create cart schema to store products
const cartSchema = new mongoose.Schema({
    username:String,
    productsInCart:[{}]

})
//create Model(class) for the userSchema
const User = mongoose.model('userCred',userSchema)

//create Model(class) for the sellerSchema
const Seller = mongoose.model('sellerCred',sellerSchema)

//create Modal class for the productSchema
const Product = mongoose.model('product',productSchema)

//create Modal class for the cartSchema
const Cart = mongoose.model('cart',cartSchema)

//export User model

module.exports = {User, Seller, Product,Cart};
