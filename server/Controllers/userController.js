//import user model and seller modal
const {User,Seller} = require('../db')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { cloudinary } = require('../Middlewares/cloudinaryUpload')
const fs = require('fs')

const getUsers = async (req,res) =>{
    let userType = req.params.userType;
    if(userType === 'user'){
        const usersList = await User.find()
        res.status(200).send({message:"Users",payload:usersList})
    }
    else if(userType === 'seller'){
        const usersList = await Seller.find()
        res.status(200).send({message:"Users",payload:usersList})
    }
 
}

const getUserByUsername = async (req,res) => {
    let username = req.params.username;
    console.log(req.params)
    let user = await User.find({username})
    
    if(user.count){
        res.send({message:"User found",payload:user})
    }
    else{
        res.send({message:"User not found"})
    }
}

const createUser = async (req,res) => {

    const user = JSON.parse(req.body.data)
    console.log(user)
    //create() => create document + save in collection 
    //let user = await User.create(req.body)

    //getting the user given username
    let userCred = user.username;
    //storing the userType
    let userType = user.userType;
  //  console.log(userCred)
  //if userType is user
    if(userType === 'user'){
        let checkUser = await User.findOne({username:userCred})
        //console.log(checkUser)
        if(checkUser === null)
        {
            //create the document
        const userDocument = new User(user)
           
        //hash the password
        let hashedPassword = await bcryptjs.hash(userDocument.password,5)
        //replace plain password with hashed password
        userDocument.password = hashedPassword;

        //upload image to cloudinary
        let result = await cloudinary.uploader.upload(req.file.path)

        //add cloudinary image url to userDocument
        userDocument.profileImageUrl = result.url;
        console.log(userDocument)
        //save the document in the collection
        let userData = await userDocument.save()

        fs.unlink(req.file.path,err=>{
            if(err){
                throw err
            }
            console.log("Image removed from local folder")
        });

        res.status(201).send({message:"User created",payload:userData})
        }
        else{
            res.send({message:"Username already exist"})
        }
    }
    else {

        //checking if user already exist
    let checkUser = await Seller.findOne({username:userCred})
    //console.log(checkUser)
    if(checkUser === null)
    {
        //create the document
    const userDocument = new Seller(user)

    //hash the password
    let hashedPassword = await bcryptjs.hash(userDocument.password,5)
    //replace plain password with hashed password
    userDocument.password = hashedPassword;
    //upload image to cloudinary
    let result = await cloudinary.uploader.upload(req.file.path)

    //add cloudinary image url to userDocument
    userDocument.profileImageUrl = result.url;
    console.log(userDocument)
    //save the document in the collection
    let userData = await userDocument.save()

    fs.unlink(req.file.path,err=>{
        if(err){
            throw err
        }
        console.log("Image removed from local folder")
    });

    //save the document in the collection
    let seller = await userDocument.save()
    res.status(201).send({message:"Seller created",payload:seller})
    }
    else{
        res.send({message:"Username already exist"})
    }
    }

}

const updateUser = async (req,res) => {
   let updatedUser =  await User.findOneAndUpdate({username:req.body.username},{...req.body})
   if(updatedUser){
         res.status(200).send({message:"User updated",payload:updatedUser})
   }
   else{
    res.status(200).send({message:"User not found"}) 
}
      
}

const deleteUser = async (req,res) => {
    let username = req.params.username;
    let user = await User.deleteOne({username})

    if(user.deletedCount !== 0){
        res.send({message:"User deleted",payload:user})
    }
    else if(user.acknowledged && user.deletedCount === 0){
        res.send({message:"User not found in DB"})
    }
    }

const loginUser = async (req,res) => {
    let userType = req.body.userType;
    let userCred = req.body;
    let userName = userCred.username;
    let userPassword = userCred.password;

    if(userType === 'user'){
        
        let userFromDb = await User.findOne({username:userName})

    if(userFromDb===null){
        res.send({message:"Invalid username"})
    }
    else
    {   
        let hashPass = await bcryptjs.compare(userPassword,userFromDb.password)
      //  let checkPassword = await User.findOne({username:userName,password:userPassword})
        if(hashPass === false){
            // console.log(hashPass)
            res.send({message:"Invalid password"})
        }
        else{
           // console.log(hashPass)
           let signedToken = jwt.sign({username:userFromDb.username},process.env.SECRET_KEY,{expiresIn:"1d"})
         // const {password,...userData} = userFromDb
            res.send({message:"User Login Successful",token:signedToken,user:userFromDb})
        }
    }
    }
    else{

        let userFromDb = await Seller.findOne({username:userName})

    if(userFromDb===null){
        res.send({message:"Invalid Seller username"})
    }
    else
    {   
        let hashPass = await bcryptjs.compare(userPassword,userFromDb.password)
      //  let checkPassword = await User.findOne({username:userName,password:userPassword})
        if(hashPass === false){
            // console.log(hashPass)
            res.send({message:"Invalid password"})
        }
        else{
           // console.log(hashPass)
           let signedToken = jwt.sign({username:userFromDb.username},process.env.SECRET_KEY,{expiresIn:"1d"})
        
            res.send({message:"Seller Login Successful",token:signedToken,user:userFromDb})
        }
    }
    }

    
} 

const getProtectedRoute = (req,res) => {
    res.send({message:"Reply from Protected"})
}
    

module.exports = {getUsers,getUserByUsername,createUser,updateUser,deleteUser, loginUser, getProtectedRoute}