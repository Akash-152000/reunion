const catchErrors = (status,message,res)=>{
    return res.status(status).json({
        success:false,
        message
    })
}

module.exports = catchErrors;