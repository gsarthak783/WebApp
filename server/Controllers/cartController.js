//import user model and seller modal
const {User,Seller, Product,Cart} = require('../db')



const getCarts = async (req,res) =>{
  const cartsList = await Cart.find()
    res.status(200).send({message:"Carts",payload:cartsList})
}

const getCartByUsername = async (req,res) => {
    let username = req.params.username;
    console.log(req.params)
    let cart = await Cart.findOne({username:username})
    
    if(cart !== null){
        res.send({message:"Cart found",payload:cart})
    }
    else{
        res.send({message:"Cart not found"})
    }
}

const createCart = async (req,res) => {

    //create() => create document + save in collection 
    //let user = await User.create(req.body)

    //getting the username and product details
    const username = req.body.username;
    const products = req.body.productsInCart;

    
    //console.log(req.body.productsInCart);
        
        let checkCartByUsername = await Cart.findOne({username:username})
        
        if(checkCartByUsername === null)
        {        console.log('hello')
              //create the  cart document and add counter variable
        checkCartByUsername = new Cart({
            username,
            productsInCart: [products],
        });  

    }
     else { 
            checkCartByUsername.productsInCart.push(products); 
        } 

        //save the document in the collection
        let cart= await checkCartByUsername.save()
      //  console.log(checkCartByUsername)
        //send response
       return res.status(201).send({message:"cart updated",payload:cart})
}

const updateCart = async (req,res) => {
   let updatedUser =  await User.findOneAndUpdate({username:req.body.username},{...req.body})
   if(updatedUser){
         res.status(200).send({message:"User updated",payload:updatedUser})
   }
   else{
    res.status(200).send({message:"User not found"}) 
}
      
}

const deleteCart = async (req,res) => {
    let username = req.body.username;
    let cart = await Cart.deleteOne({username})

    if(product.deletedCount !== 0){
        res.send({message:"Cart deleted",payload:cart})
    }
    else if(product.acknowledged && product.deletedCount === 0){
        res.send({message:"Cart not found in database"})
    }
    }


    

module.exports = {getCarts,getCartByUsername,createCart,updateCart,deleteCart}