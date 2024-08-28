const mongoose = require('mongoose');
require("dotenv").config();
const DB_URL =process.env.MONGO_URL
mongoose.connect(DB_URL).then(res=>{
  console.log("Database Connected....")
}).catch(err=>{
  console.log("Error while making connection with database server", err)
})