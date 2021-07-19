const express=require('express')
const router=express.Router()
const ControllerParking=require('../conroller/parking')
const multer=require('multer');
const unirest = require("unirest");

const storage  = multer.diskStorage({
    destination :(req , file , cb)=>{
        cb(null,'upload');

    },
    filename :(req,file,cb)=>{
        cb(null , Date.now()+"-"+file.originalname);

    }
});

const filter = (req , file , cb)=>{
    if(file.mimetype == "image/jpeg" || file.mimetype == 'image/png'){
        cb(null , true);
    }else{
        cb(null , false);
    }
}
const upload = multer({
    storage : storage ,
    fileFilter : filter , 
    
});



router.get('/locapi', ControllerParking.getloc)
router.post('/creatParking',upload.single('image'),ControllerParking.creatParking)
router.get('/getParking',ControllerParking.getparking)
router.get('/getParking/:id',ControllerParking.getparkingbyid)
module.exports=router

// router.post('/postLoc', ControllerParking.addLoc)
// router.get('/getLoc', ControllerParking.getLoc)