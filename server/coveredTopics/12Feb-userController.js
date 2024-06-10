const getUsers = async (req,res) =>{
    res.send({message:"List of all users"})
}

const getUserByUsername = async (req,res) => {
    res.send({message:"User One"})
}

const createUser = async (req,res) => {
    res.send({message:"User Created"})
}

const updateUser = async (req,res) => {
    res.send({message:"User updated"})
}

const deleteUser = async (req,res) => {
    res.send({message:"User Deleted"})
}

module.exports = {getUsers,getUserByUsername,createUser,updateUser,deleteUser}