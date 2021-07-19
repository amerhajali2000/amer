const { Router } = require('express')
const express=require('express')
const router=express.Router()
const ControllerUserO=require('../conroller/userowner')

router.post('/registerowner',ControllerUserO.register)
router.post('/loginOwner',ControllerUserO.login)
router.get('/getOwner',ControllerUserO.getOwner)
router.put('/updateAccountOwner',ControllerUserO.updateAccount)

module.exports=router