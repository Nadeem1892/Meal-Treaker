const mongoose = require("mongoose");

const calendarSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    date:{
        type:String,
        required:true
    },
    meals: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Meal"
      }],
},{ timestamps: true })

module.exports = mongoose.model("Calendar", calendarSchema);