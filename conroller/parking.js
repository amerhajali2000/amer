const Park=require('../model/Parking')
const unirest = require("unirest");
const owner = require('../model/UserOwner')

var nodemailer = require('nodemailer')

var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
      user: 'parking.go2021@gmail.com',
      pass: 'amer732393'
  }
});

var functionP={
    
    creatParking : async(req,res,next)=>{
//نبحث أولا عن الأونر بواسطة الآي دي
        try{
            const result = await new Park({
              name : req.body.name,
              phone:req.body.phone,
              capacity:req.body.capacity,
              hourPrice:req.body.hourPrice,
              image: req.file.filename,
              owner: req.body.owner
            }) 
            result.save(function(err){
              if(err){
                console.log(err)
                 res.json({secssus:false,msg:err})
              }else{
                 res.json({secssus:true,msg:'Parking Inserted'})
              }
              var mailOptions1 = {
                from: req.body.email,
                to: "parking.go2021@gmail.com",
                subject: 'New parking',
                text:"name: "+req.body.name+
                    " || phone: "+req.body.phone+
                    " || id: "+req.body.owner
              };
              transporter.sendMail(mailOptions1, function(error, info){
                if (error) {
                  console.log(error);
                  res.json(err);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              }); 
 
          });
        }catch(err){res.json(err)}

     },
     editParking: async(req,res,next)=>{
      try{
        const update={
            name:req.body.name,
            phone:req.body.phone,
            capacity:req.body.capacity,
            hourPrice:req.body,hourPrice
        }
        Park.findOneAndUpdate({email:req.body.email}, {$set:update}).then(
                   res.json({secssus:true,msg:'Driver: your profile updated', update})
        )
        }catch(err){
            res.json(err)
        }
     },
     getparkingbyid: async(req,res)=>{
      console.log('ok get')
  
      try {
        Park.findOne({_id:req.params.id}).exec((err,result)=>{
          if(result)
          res.json({'result is':result})
        })
      } catch (err) {
        res.json(err)
      }
    },
     getparking:async(req,res)=>{
       try{
        const park= await Park.find().then(
          result=>{
            res.json({
              result:result.map(
                result=>{
                  return{
                    name :result.name,
                    phone: result.phone,
                    capacity: result.capacity,
                    hourPrice: result.hourPrice,
                    image: 'https://api-parking-vehicle.herokuapp.com/'+ result.image,
                    owner: result.owner
                  }
                }
              )
            })
          }
        )
       }catch(err){
        res.json(err)
       }
      },
      getloc: (req, res)=>{const apiCall = unirest(
        "GET",
       "https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/")
       apiCall.headers({
           "x-rapidapi-host": "ip-geolocation-ipwhois-io.p.rapidapi.com",
            "x-rapidapi-key": "8f1dc44c52mshf6fb349d83ef735p1bc49cjsnada55f20dc57"
        });
        apiCall.end(function(result) {
            if (res.error) throw new Error(result.error);
            console.log(result.body);
            res.json({
                longitude:result.body.longitude,
                latitude:result.body.latitude    
    });
  });
    },
}


module.exports=functionP

    //   addLoc : async(req, res, next)=>{
    //       try {
    //           const storeloc= await Park.create(req.body)

    //           return res.status(200).json({
    //                success: true,
    //                data : storeloc
    //           })
    //       } catch (err) {
    //           console.error(err);
    //           if(err.code===11000){
    //               return res.status(400).json({error: 'this location already exist'})
    //           }
    //           res.status(500).json({error: 'server error'})
    //       }
    //   },

    //   getLoc : async (req, res, next) => {
    //     try {
    //       const gloc = await Park.find();
      
    //       return res.status(200).json({
    //         success: true,
    //         count: gloc.length,
    //         data: gloc
    //       });
    //     } catch (err) {
    //       console.error(err);
    //       res.status(500).json({ error: 'Server error' });
    //     }
    //   }
