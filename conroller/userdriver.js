const UserD=require('../model/UserDriver')
const Bcrypt=require('bcrypt')

var functionD={

 register: function(req,res,next){

    UserD.findOne({email:req.body.email},function(err,userd){
        if(err){
            res.json({secssus:false,msg:err})
        }else if(userd){
            res.json({secssus:false,msg:'the account is already exist'})
        }else{
         userd =new UserD({
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            password:req.body.password,
            type:'userdriv'
        }).save(function(err){
             if(err){
                res.json({secssus:false,msg:err})
             }else{
                res.json({secssus:true,msg:'Account created'})
             }

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
        UserD.findOneAndUpdate({email:req.body.email}, {$set:update}).then(
                   res.json({secssus:true,msg:'Driver: your profile updated', update})
        )
        }catch(err){
            res.json(err)
        }
    
},

 login:function(req,res,next){
     UserD.findOne({email:req.body.email},function(err,userd){
         if(err){
             res.status(500).send({secssus:false,msg:err})
         }else if(!userd){
            res.json({secssus:false,msg:'the account is not register'})
         }else if(!Bcrypt.compareSync(req.body.password,userd.password)){
            res.json({secssus:false,msg:'the password is not Invalid'})
         }
         else{
            res.json({secssus:true,msg:{'name':userd.name,'email':userd.email}})
         }
     })
 }
 

}


module.exports=functionD