//create express app
const exp = require('express')
const app = exp();

const path = require('path')

//connect to react app
app.use(exp.static(path.join(__dirname,'../client/build')))

//configured env variables
require('dotenv').config()

app.use(exp.json())

const userApp = require('./API/userApi')

const productApp = require('./API/productApi')

const cartApp = require('./API/cartApi')

//forware req to userApp when path starts with /user-api
app.use('/user-api',userApp)

//forware req to productApp when path starts with /product-api
app.use('/product-api',productApp)

//forware req to productApp when path starts with /product-api
app.use('/cart-api',cartApp)

//error handler
app.use((err,req,res,next) =>{
    
    res.send({message:'error occured',error:err})
})

//assign port nymber
const PORT = process.env.PORT;
app.listen(PORT, ()=>console.log(`webserver is running on port ${PORT} ...`))