module.exports = (myfunction) => (req,res,next)=>{
    Promise.resolve(myfunction(req,res,next)).catch(next)
}