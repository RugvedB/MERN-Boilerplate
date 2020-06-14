const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const { errbody , respbody } = require('../helper/responseMessage');
const { randomGenerator } = require("../helper/randomGenerator");
const { auth }= require("../middleware/auth");
const saltRounds = 10;
const Mail = require('../helper/Mail');
const Hash = require('../helper/Hash');

//=================================
//             User
//=================================



router.get('/',(req,res,next) => {
    return respbody(res,{message: 'User Route'})
})

router.post('/securedRoute',auth,(req,res) => {
    console.log('req.user')
    console.log(req.user)
    return respbody(res,{
        user: req.user,
        header: req.headers,
        body: req.body 
    })
})

router.post('/saveUser',(req,res) => {
    try{
        const user = new User(req.body)
        user.save((err,doc) => {
            if(err) return errbody(res,err)
            return respbody(res,{doc})
        })
    }
    catch(err){
        return errbody(res,err)
    }
})

router.post('/login',async (req,res) => {
    const user = await User.findOne({ mail : req.body.mail })
    if(!user){
        return errbody(res,"Mail doesnt exist")
    }
    if(!user.isVerified){
        return errbody(res,"Mail Verification Incomplete")
    }

    user.comparePassword(req.body.password ,(err,isMatch) => {
        if(err) return errbody(res,"Error")
        else if(!isMatch) return errbody(res,"Wrong Password")
        else if(isMatch){
            //Password match. Now generate token
            user.generateToken((err,{ token }) => {
                return respbody(res,{ token })
            })
        }
    })
    
})

router.post('/updateUser',(req,res) => {
    try{
        
        let updateObj = req.body
        const _id = req.body._id
        delete updateObj['_id']

        User.updateOne({ _id } , { $set : updateObj } ,(err,doc) => {
            //Here doc is the result
            if(err) return errbody(res,err)
            return respbody(res,{doc})
        })
    }
    catch(err){
        return errbody(res,err)
    }
})

router.post('/deleteUser',(req,res) => {
    try{

        const _id = req.body._id
        
        User.deleteOne({ _id } , (err,doc) => {
            if(err) return errbody(res,err)
            return respbody(res,{doc})
        })
    }
    catch(err){
        return errbody(res,err)
    }
})


//If we are using mail only then below routes will be user

//This is the route where user will come to verify
router.get("/:mail/:resetCode",async (req,res) => {
    const user = await User.findOne({ mail : req.params.mail })
    if(!user) return errbody(res,"Code Expired")

    if(user.resetCode == req.params.resetCode){
        let resetCode = randomGenerator()
        User.updateOne(
            { mail : user.mail },
            { $set : { resetCode ,isVerified : true }},
            (err,doc) => {
                if(err) errbody(res,err)
                return respbody(res,{Verifiecation:"Success"})
            }
        )
    }
    else{
        return errbody(res,"Wrong Code")
    }
})

//This is called when user request to send hi/her mail
router.post("/forgetPassword", async (req, res) => {
  
    const timeLimit = 60000; //60 seconds
  
    const user = await User.findOne({ mail: req.body.mail }).select("-password");
    
    if(!user) return errbody(res,"Mail not registered.")
  
    
    let content = 
        ` 
            <b>Hey ${user.mail} </b><br>
            A password reset request has been sent from your account</b>
            <br><br />
            Use the code ${user.resetCode} to reset your password.<br>
            This code is active for ${timeLimit/1000} seconds<br>
        `

  
    const sendMailResult = await Mail.sendMail(
      req.body.mail,
      "Reset password",
      content
    );
    if (sendMailResult.error) {
      return errbody(res,"Mail operation failed")
    } 
    else {
      // clean up
      // Mail has been sent successfully
      // So after sometime we will just change the reset the "resetCode"(which is used for resetting password)
      setTimeout(async () => {
        let resetCode = randomGenerator()
        await User.updateOne(
          { mail: user.mail },
          { $set: { resetCode } }
        );
        console.log("resetCode changed");
      }, timeLimit);
  
  
      return res.status(200).json({
        success: true,
        message:
          "Check your mail. Reset password link has been sent to your mail.",
      });
    }
});

//This is called when user sends reset code and new password changing password
router.post("/passwordReset", async (req, res) => {
    //req.body => resetCode,password
    const user = await User.findOne({ mail: req.body.mail });
  
    if(!user) return errbody(res,"Mail not registered.")
  
    console.log(
        "  user.resetCode:" +
        user.resetCode +
        "  req.body.resetCode : " +
        req.body.resetCode +
        "  password:" +
        req.body.password
    );
    if (user.resetCode == req.body.resetCode) {
      console.log("Inside if (passwordReset)");
  
      //hash password
      try {
        var resultOfHash = await Hash.HashIT({password : req.body.password})
    
        if(resultOfHash.error) return errbody(res,"Hashing unsuccessful. ")

        let resetCode = randomGenerator();
        await User.updateOne(
            { mail: user.mail },
            { $set: { password: resultOfHash.hash, resetCode } }
        );
        return respbody(res,{status : "Password Reset Successful"})

        
      } catch (err) {
        return errbody(res, "Error")
      }
    } 
    else {
        return errbody(res, "Wrong Code")
    }
  });

module.exports = router



// const updateOps = {};
// for(const ops of req.body){
//     console.log(JSON.stringify(ops))
//     updateOps[ops.propName] = ops.value;
// }