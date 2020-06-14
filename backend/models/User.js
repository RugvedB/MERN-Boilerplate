const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Mail = require('../helper/Mail');
const Hash = require('../helper/Hash');
const { randomGenerator } = require('../helper/randomGenerator');
const { errbody } = require('../helper/responseMessage');

const userSchema = mongoose.Schema({
    mail :{
        type: String ,
        trim: true,
        unique: true,
        required: true
    },
    password :{
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    resetCode :{
        type: Number,
        default: randomGenerator
    },
    isVerified :{
        type:Boolean,
        default: false
    }
})

/*
=============
 Functions
=============
*/

userSchema.methods.comparePassword = function(plainPassword,cb){
    bcrypt.compare(plainPassword, this.password ,function(err, isMatch) {
        if(err) return cb(err)
        console.log(isMatch)
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb) {
    var user = this;
    var token =  jwt.sign(user._id.toHexString(),process.env.SECRET_KEY)
    
    cb(null, { token });
}

/*
=============
 Middleware
=============
*/

userSchema.pre('save',async function(next) {
    var user = this

    if (!this.isNew) return next()
    console.log('Its a new user so hash the password.')

    
    var resultOfHash = await Hash.HashIT({password : user.password})
    
    if(resultOfHash.error) return errbody(res,"Hashing unsuccessful. ")

    
    user.password = resultOfHash.hash
    
    
})

userSchema.post('save',async function(next){
    var user = this
    if(!user.isVerified){
        let timeLimit = 40000 //40 sec (Amount of time after which if user doesnt verify then his/her reset code will be changed)
        
        let content = 
        `
            <b>Welcome ${user.mail} </b><br>
            Activate your account by using the following code <strong>${user.resetCode}</strong> </b>
            <br> Code will be active for ${timeLimit/1000} seconds <br />
            Click on <a href=${process.env.server_base_url}/api/users/${user.mail}/${user.resetCode}>link</a>
            to activate your account. <br />
        `
        
        var sendMailResult = await Mail.sendMail(user.mail , "Mail verification" ,content )//to ,subject ,html
        console.log('sendMailResult :'+JSON.stringify(sendMailResult))
        if(sendMailResult.error){
            //handle mail errors here
        }



        //clean up
        setTimeout(async () =>{
            
            let afterExpirationTime_user = await User.findById(user._id)
            if(!afterExpirationTime_user.isVerified){
                User.deleteOne({_id : user._id})
                    .then((data) => console.log(data))
                    .catch(err => console.log(err))
            }
            else{
                console.log('User is verified')
            }
        }, timeLimit)


    }
    else{
        console.log('User is already verified')
    }
    
})

userSchema.pre('updateOne',async function() {
    
    console.log(JSON.stringify(this.getQuery())) //Eg : {"_id":"5ee4bc9d85fe283943146774"}
    const docToUpdate = await this.model.findOne(this.getQuery());
    console.log('docToUpdate :'+JSON.stringify(docToUpdate)); // The document that `findOneAndUpdate()` will modify
    
});

userSchema.pre('deleteOne',async function() {
    
    console.log(JSON.stringify(this.getQuery())) //Eg : {"_id":"5ee4bc9d85fe283943146774"}
    const docToDelete = await this.model.findOne(this.getQuery());
    console.log('docToDelete :'+JSON.stringify(docToDelete)); // The document that `findOneAndUpdate()` will modify
    
});

const User = mongoose.model('User',userSchema)

module.exports = { User }