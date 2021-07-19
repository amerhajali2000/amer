const mongoose = require('mongoose');

const ParkingSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required:true
        },
        owner: {
          type:mongoose.Schema.Types.ObjectId,
          ref:'userowner'
        },
    phone:{
        type: String,
     required:true
    },
    image:{
        type:String,
          
    },
    capacity:{
      type:Number,
      required:true
    },
    hourPrice:{
      type:Number,
      required:true
    },
   
});


module.exports= mongoose.model('parking', ParkingSchema);

// const geocoder = require('../utils/geocoder')

// ParkingSchema.pre('save', async function(next){
//     const loc= await geocoder.geocode(this.address)
//     this.location = {
//         type: 'point',
//         coordinates: [loc[0].longitude, loc[0].latitude],
//         formattedadress: loc[0].formattedAddress
//     },
//     this.address= undefined
//     next();
// })
