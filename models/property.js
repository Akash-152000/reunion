const mongoose = require('mongoose')

const propertySchema = new Schema({

    propertyName:{
        type:String,
        required:[true,"Please enter property Name"]
    },
    propertyAddress:{
        type:String,
        required:[true,"Please enter property Address"]
    },
    rooms:{
        type:Number,
        required:[true,"Please enter No.of Rooms"],
        maxLength:[2,"Cannot exceed two characters"]
    },
    toilets:{
        type:Number,
        required:[true,"Please enter No.of Toilets"],
        maxLength:[2,"Cannot exceed two characters"]
    },
    area:{
        type:String,
        required:[true,"Please enter No.of Toilets"],
        default:"5x7m2"
    },
    images:{
        type:String,
        default:'/images/default_property.jpg'
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

})

module.exports = mongoose.model('Property',propertySchema)