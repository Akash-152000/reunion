const Property = require('../models/property')

exports.getAllProperties = (req,res)=>{

}

exports.addProperties = async (req,res)=>{
    const {propertyName,propertyAddress,rooms,toilets,area} = req.body
    const property  = await Property.create({propertyName,propertyAddress,rooms,toilets,area})

    res.status(201).json({
        success:true,
        property
    })
}