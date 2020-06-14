const express = require("express");
const router = express.Router();

//=================================
//             Test
//=================================


router.get('/',(req,res,next) => {
    return res.status(200).json({
        success: true,
        message: 'Test Route'
    })
})


module.exports = router