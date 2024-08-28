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
    isDeleted:{
        type:Boolean,
        required:false
    }
},
{timestamps: true}
)

module.exports = mongoose.model("users",userSchema)