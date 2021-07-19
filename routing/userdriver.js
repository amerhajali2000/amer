const express=require('express')
const router=express.Router()
const ControllerUserD=require('../conroller/userdriver')



router.post('/registerdriver',ControllerUserD.register)
router.post('/loginDriver',ControllerUserD.login)
router.put('/updateAccountDriver',ControllerUserD.updateAccount)


module.exports=router