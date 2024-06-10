const exp = require('express')
const userApp = exp.Router()

const expressAsyncHandler = require('express-async-handler')

//import req handlers from controllers
const {getUsers, getUserByUsername,createUser,updateUser,deleteUser} = require('../Controllers/userController')


//user CRUD

//read all users
userApp.get('/users',expressAsyncHandler(getUsers))

//get user by username
userApp.get('/user/:username',expressAsyncHandler(getUserByUsername))

//create user
userApp.post('/user',expressAsyncHandler(createUser))

//update user
userApp.put('/user',expressAsyncHandler(updateUser))

//delete user
userApp.delete('/user',expressAsyncHandler(deleteUser))



module.exports = userApp;