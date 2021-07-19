const mongoose = require('mongoose');
const bcrypt=require('bcrypt')

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const UserOwnerSchema =  mongoose.Schema({

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
        password: {
            type: String,
            required: true
        },  
        active:{
            type:Boolean,
            default:false
        },    
})
UserOwnerSchema.pre('save', function (next) {
    var userowner = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err)
            }
            bcrypt.hash(userowner.password, salt, function (err, hash) {
                if (err) {
                    return next(err)
                }
                userowner.password = hash;
                next()
            })
        })
    }
    else {
        return next()
    }
})
UserOwnerSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if(err) {
            return cb(err)
        }
        cb(null, isMatch)
    })
}

module.exports= mongoose.model('userowner', UserOwnerSchema);