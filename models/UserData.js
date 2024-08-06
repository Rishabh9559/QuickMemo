const mongoose=require("mongoose");

const DataSchema =new mongoose.Schema({
    Email:{
        type:String,
        require:true,
    },
    Heading:{
        type:String,
        require:true,
    },
    Note:{
        type:String,
        require:true,
    },
});

const DataUser=mongoose.model("DataUser",DataSchema);
module.exports=DataUser;