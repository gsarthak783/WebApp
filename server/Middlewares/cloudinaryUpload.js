const cloudinary = require('cloudinary').v2;

const multer = require('multer');
require('dotenv').config()
const fs = require('fs')

// create uploads folder if not already present
// we temporarily uploads the file in this folder
//before actually uploading it in the database
if(!fs.existsSync("./uploads")){
    fs.mkdirSync("./uploads")
}

//cloudinary configuration
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})


//multer config
const localStorage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null,"./uploads");
    },
    filename: function (req,file,cb) {
        cb(null, file.originalname);
    },
})

const upload = multer({storage : localStorage});
module.exports = {upload,cloudinary};