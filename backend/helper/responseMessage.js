module.exports.errbody =  (res,err) => {
    return res.status(500).json({
        success: false,
        err
    })
}

module.exports.respbody = (res,returnedValue) => {
    return res.status(200).json({
        success: true,
        returnedValue
    })
}