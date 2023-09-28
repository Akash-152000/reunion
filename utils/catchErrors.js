const catchErrors = (status,message,res)=>{
    return res.status(status).json({
        success:true,
        message
    })
}

module.exports = catchErrors;