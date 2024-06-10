//import user model and seller modal
const {User,Seller, Product} = require('../db')



const getProducts = async (req,res) =>{
  const productsList = await Product.find()
    res.status(200).send({message:"Products",payload:productsList})
}

const getProductByName = async (req,res) => {
    let username = req.params.username;
    console.log(req.params)
    let product = await Product.find({username:username})
    
    if(product !== null){
        res.send({message:"Product found",payload:product})
    }
    else{
        res.send({message:"Product not found"})
    }
}

const createProduct = async (req,res) => {

    //create() => create document + save in collection 
    //let user = await User.create(req.body)

    //getting the seller given productId
    let productId = req.body.productId;
    let productName = req.body.productName;

        let checkProductById = await Product.findOne({productId:productId})
        
        if(checkProductById === null)
        {   
            let checkProductByName = await Product.findOne({productName:productName})
            if(checkProductByName === null){
              //create the  product document
        const productDocument = new Product(req.body)
    
        //save the document in the collection
        let product = await productDocument.save()
        //send response
        res.status(201).send({message:"Product created",payload:product})
            }
            else{
                res.status(200).send({message:"Product Name already exist"})
            }
            
        }
        else{
            res.status(200).send({message:"Product Id already exist"})
        }
    
}

const updateProduct = async (req,res) => {
   let updatedUser =  await User.findOneAndUpdate({username:req.body.username},{...req.body})
   if(updatedUser){
         res.status(200).send({message:"User updated",payload:updatedUser})
   }
   else{
    res.status(200).send({message:"User not found"}) 
}
      
}

const deleteProduct = async (req,res) => {
    let productId = req.body.productId;
    let product = await Product.deleteOne({productId})

    if(product.deletedCount !== 0){
        res.send({message:"Product deleted",payload:product})
    }
    else if(product.acknowledged && product.deletedCount === 0){
        res.send({message:"Product not found in database"})
    }
    }


    

module.exports = {getProducts, getProductByName, createProduct, updateProduct, deleteProduct}