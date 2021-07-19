const mongoose=require('mongoose')
const dataconfig= require('./dataconfig').db
const connectDB= async ()=>{
try{
 
    const connec=await mongoose.connect(dataconfig,{

        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    console.log("mongoose connect...");
  

}catch(err){
    console.log(err);
    process.exit(1)
}
}

module.exports=connectDB