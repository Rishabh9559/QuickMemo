const mongoose =require("mongoose");
const UserSchema=new mongoose.Schema({
   Fname:{
    type:String,
    required:true,
   },
    Lname:{
        type:String,
        required:true,
    },
    Email:{
        type:String,
        required:true,
        
        
    },
    Password:{
        type:String,
        required:true,
    },

});
const UserModel = mongoose.model("User", UserSchema)
module.exports = UserModel

