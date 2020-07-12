var mongoose = require('mongoose');
const { use } = require('../routes/routes');
var Schema = mongoose.Schema; // <-- EDIT: missing in the original post
var Comments = new Schema({
     fullName:{
         type:String,
         required:true,
         trim:true
     },
     email:{
         type:String,
         required:true,
         unique:true,
         trim:true
     },
     phoneNo:{
         type:String,
         required:true,
         trim:true
     },
     password:{
         type:String,
         required:true,
         unique:true,
         trim:true
     },
     createdAt:{
         type:Date,
         default:Date.now()
     }
});
const user =mongoose.model("user", Comments);
module.exports =user;
