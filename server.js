const express = require('express');
const app=express();
// const cors = require('cors')
// const dotenv= require('dotenv')
const connectdb= require('./config/db');
const routuserDriver=require('./routing/userdriver')
const routuserOwner=require('./routing/userowner')
const routParking=require('./routing/parking')

//connect to db
connectdb();

// app.use(cors())

//load env vars
// dotenv.config({path: './config/config.env'})


app.use(express.urlencoded({extended : true}));
app.use(express.json())
app.get("/" ,function(req,res){
    res.send("API Parking is Running ")
})
app.use(routuserDriver)
app.use(routuserOwner)
app.use(express.static('upload'),routParking)

const PORT= process.env.PORT ||3000;
app.listen(PORT,()=>console.log(`Server started in port ${PORT}`) );
module.exports = app;