const exp = require('express')
const userApp = exp.Router()

const expressAsyncHandler = require('express-async-handler')

//import req handlers from controllers
const {getUsers, getUserByUsername,createUser,updateUser,deleteUser, loginUser, getProtectedRoute} = require('../Controllers/userController')
const verifyToken = require('../Middlewares/verifyToken')
const {upload} = require('../Middlewares/cloudinaryUpload');


//user CRUD

//read all users
userApp.get('/users',expressAsyncHandler(getUsers))

//get user by username
userApp.get('/user/:username',expressAsyncHandler(getUserByUsername))

//create user
userApp.post('/user',upload.single('profileImage'),expressAsyncHandler(createUser))

//update user
userApp.put('/user',expressAsyncHandler(updateUser))

//delete user
userApp.delete('/user/:username',expressAsyncHandler(deleteUser))

//login user
userApp.post('/user-login',expressAsyncHandler(loginUser))

//protected
userApp.get('/protected',verifyToken,expressAsyncHandler(getProtectedRoute))





module.exports = userApp;