const mongoose=require("mongoose");

const DataSchema = new mongoose.Schema({
    Heading:{
        type:String,
        require:true,
    },
    Note:{
        type:String,
        require:true,
    },
});
// calling email form app.js used into dataschema name
const email=require("../App");

const DataUser=mongoose.model(email,DataSchema);
module.exports=DataUser;