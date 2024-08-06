const express=require("express");
const Port=3000;
const mongoose=require("mongoose");
const bodyParser=require('body-parser');
const UserModel = require("./models/User");
const UserData=require("./models/UserData");

const app=express();

// databse connection mongoosedb
mongoose.connect("mongodb://localhost:27017/QuickMomo").then(()=>{
    console.log("Connect to DataBase");
})

// ejs stablised
app.set("view engine","ejs");
// body html value taken 
app.use(bodyParser.urlencoded({ extended: true }));

// css file use
app.use("/public",express.static("public"));

// get for index 
app.get("/",(req,res)=>{
res.render("index");
});




// for sinup 

app.post("/", async (req, res) => {
    try{
    
    const email=req.body.Email;
    console.log("Email is "+email);

    // const olduser=await UserModel.findOne({Email:email}); 
    // console.log("old user"+olduser.Email)

    const user = await UserModel.create({
      name: req.body.name,
      Email:req.body.Email,
      Password: req.body.Password
    });
    
    if( user.name!=null){
   res.render("login") }
   else{
    app.get("/",(req,res)=>{
        
    });   }
}
catch(err) {
    console.log(err);

}   });







  // login 
  let email="";
  app.post("/login",async (req,res)=>{
    try{
         email=req.body.Email;
        console.log('login email :'+email);

    const user=await UserModel.findOne({Email:email});
        console.log(user);
    if(user){
        
        if(user.Password==req.body.Password){
            res.render("addNotes");

        }
        else{
            res.send("wrong password")
        }
    }
    }
    catch
    {
        res.send("wrong")
    }

  })







 //Insert Notes
 app.post("/addNotes",(req,res)=>{
    const insertData=UserData.create({
        Email:email,
        Heading:req.body.heading,
        Note:req.body.note
    });
    console.log("data store ");
    res.render("home");
 }) 





//data fetch for notes
app.post("/home",(req,res)=>{
    const getData=UserData.findOne({Email:email});
    const Heading=getData.Heading;
    const Note=getData.Note;

    console.log("title : "+Heading);
    console.log("notes : "+Note);

    res.render("home",{Heading,Note});
    
})




app.listen(Port,()=>{
    console.log("Server runing on port : http://localhost:"+Port);
})