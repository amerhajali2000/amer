const mongoose = require('mongoose');
const bcrypt=require('bcrypt')

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const UserDriverSchema =  mongoose.Schema({
    
    name: {
        type: String,
        required:true
        },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
    phone:{
        type: String,
        required:true
    },
      // ParkingSchema.index({location: '2dsphere'}) 
    password: {
            type: String,
            required:true
        },  
})
UserDriverSchema.pre('save', function (next) {
    var userdriv = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err)
            }
            bcrypt.hash(userdriv.password, salt, function (err, hash) {
                if (err) {
                    return next(err)
                }
                userdriv.password = hash;
                next()
            })
        })
    }
    else {
        return next()
    }
})
UserDriverSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if(err) {
            return cb(err)
        }
        cb(null, isMatch)
    })
}

module.exports= mongoose.model('userdriv', UserDriverSchema);
