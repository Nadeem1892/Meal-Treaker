const mongoose = require("mongoose")
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        require:true
    },
    weight:{
        type:String,
        require:true
    },
    height:{
        type:String,
        require:true
    },
    isDeleted:{
        type:Boolean,
        required:false
    },
   
},
{timestamps: true}
)

module.exports = mongoose.model("users",userSchema)