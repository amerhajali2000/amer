const UserO=require('../model/UserOwner')
const Bcrypt=require('bcrypt')
const Park=require('../model/Parking')

var nodemailer = require('nodemailer')

var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
      user: 'parking.go2021@gmail.com',
      pass: 'amer732393'
  }
});

var functionO={

    register: function(req,res,next){
   
       UserO.findOne({email:req.body.email},function(err,usero){
           if(err){
               res.json({secssus:false,msg:err})
           }else if(usero){
               res.json({secssus:false,msg:'the account is already exist'})
           }else{
            usero =new UserO({name:req.body.name,email:req.body.email,phone:req.body.phone,password:req.body.password,active:req.body.active,_id:req.body._id,type:'userowner'}).save(function(err){
                if(err){
                   res.json({secssus:false,msg:err})
                }else{
                   res.json({secssus:true,msg:'created account'})
                }
                UserO.findOne({email:req.body.email}, function(err, usero){
                  var mailOptions = {
                    from: 'parking.go2021@gmail.com',
                    to: req.body.email,
                    subject: 'welcome to Parking Go App',
                    text:"مرحبًا "+req.body.name+" \nشكرًا لتسجيلك لقد استلمنا طلبك عليك إكمال عملية تسجيل موقفك في التطبيق \n علمًا أن رقم الحساب الخاص بك هو "+usero._id
                  }; 
                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log(error);
                        res.json(err);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                  }) 
                })               
            })
           }
       })
    },
    
    updateAccount:function(req,res,next){
        try{
            const update={
                name:req.body.name,
                email:req.body.email,
                phone:req.body.phone,
                password:req.body.password
            }
            UserO.findOneAndUpdate({email:req.body.email},{$set:update}).then(
                       res.json({secssus:true,msg:'Owner: your profile updated', update})
            )
            }catch(err){
                res.json(err)
            }
        
    },


    login:function(req,res,next){
        UserO.findOne({email:req.body.email}, function(err, usero){
            if(err){
                res.status(500).send({secssus:false, msg:err})
            }else if(!usero){
               res.json({secssus:false,msg:'the account is not register'})
            }else if(!Bcrypt.compareSync(req.body.password,usero.password)){
               res.json({secssus:false,msg:'the password is not Invalid'})
            }
            else{
                res.json({secssus:usero.active,msg:{'user':usero.name,'email':usero.email}})
            }
        })
    },

    getOwner:async(req,res)=>{
        try {
            var result=await UserO.find().populate('owner')
            console.log(result)
            res.json({
                result:result.map(result=>{
                    return{
                        id: result._id,
                        name: result.name,
                        email: result.email,
                        phone: result.phone,
                        active: result.active,

                    }
                })
            })
        } catch (err) {
            res.json(err)
        }
    }
   
   }
   
   
   module.exports=functionO