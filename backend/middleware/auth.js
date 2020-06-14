const { User } = require('../models/User');
const jwt=require('jsonwebtoken')

let auth = async (req, res, next) => {
  try{
    const token=req.headers.authorization.split(" ")[1]
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    req.decoded = decoded
    let user = await User.findById(decoded).select('-password -resetCode')
    if(!user.isVerified) throw "Not Verified"
    req.user = user
    next() 
  }
  catch(err){
    return res.status(401).json({
        success:false,
        status:'Auth Failed',
        err
    })
  }

};

module.exports = { auth };
