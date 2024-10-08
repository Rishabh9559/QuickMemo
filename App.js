const express = require("express");
const Port = 3000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const UserModel = require("./models/User");
const { name } = require("ejs");

const app = express();

mongoose.connect("mongodb://localhost:27017/QuickMomo").then(() => {
  console.log("Connect to DataBase");
});

app.set("view engine", "ejs");

// body html value taken
app.use(bodyParser.urlencoded({ extended: true }));

// css file use
app.use("/public", express.static("public"));

// get for index
app.get("/", (req, res) => {
  res.render("index");
});

// for sinup
app.post("/", async (req, res) => {
  try {
    const Inputemail = req.body.Email;
 
    console.log("Email is " + Inputemail);

    // case change
    function caseSmall(text) {
      return text.toLowerCase();
    }
    const email = caseSmall(Inputemail);

    // check exixting user
    const existingUser = await UserModel.findOne({ Email: email });
    if (existingUser) {
      res.render("login");
      return res.status(400).json({ message: "User already exists" });
    } else {
      const user = await UserModel.create({
        Fname:req.body.Fname,
        Lname: req.body.Lname,
        Email: email,
        Password: req.body.Password,
      });

      // Data base creating by mail
      module.exports = email;
      const UserData2 = require("./models/UserData");
      const homeData = await UserData2.find();
      const Fname=req.body.Fname;
      res.render("home", { notesData: homeData });
    }
  } catch (err) {
    console.log(err);
  }
});

// login click
app.get("/login", (req, res) => {
  res.render("login");
});

// login
app.post("/login", async (req, res) => {
  try {
    const Inputemail = req.body.Email;
    console.log("Email is " + Inputemail);
    
    // case change
    function caseSmall(text) {
      return text.toLowerCase();
    }
    const email = caseSmall(Inputemail);

    const user = await UserModel.findOne({ Email: email });
    const Fname=user.Fname;
    console.log(user);
    if (user) {
      if (user.Password == req.body.Password) {
        module.exports = email;
        // import the data structure schema
        // notes fetch
        const UserData2 = require("./models/UserData");

        const NotesFetch = await UserData2.find();
        console.log(NotesFetch);

        
        res.render("home", { notesData:NotesFetch });
      } else {
        res.send("wrong password");
      }
    }
  } catch {
    res.send("wrong");
  }
});

// home page click
app.get("/home", async (req, res) => {
  const UserData2 = require("./models/UserData");
  const NotesFetch = await UserData2.find();
  console.log(NotesFetch);
  res.render("home", {
    notesData: NotesFetch,
   
  });
});

// add Notes click
app.get("/addNotes", (req, res) => {
  res.render("addNotes");
});

//Insert Notes
app.post("/addNotes", async (req, res) => {
  const UserData = require("./models/UserData");
  const insertData = await UserData.create({
    Heading: req.body.heading,
    Note: req.body.note,
  });

  console.log("data store ");

  //notes fetch
  const UserData2 = require("./models/UserData");

  const NotesFetch = await UserData2.find();
  console.log(NotesFetch);

  res.render("home", {
    notesData: NotesFetch,
  });
});

// /Delete data
app.get("/delete/:id", async (req, res) => {
  const id = req.params.id;
  console.log("id is " + id);
  const UserData2 = require("./models/UserData");
  let de = await UserData2.findByIdAndDelete({ _id: id });
  console.log("delete value " + de);

  const NotesFetch = await UserData2.find();
  console.log(NotesFetch);

  res.render("home", {
    notesData: NotesFetch,
  });
});

// update data - fetch data for update
app.get("/updateNotes/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const UserData2 = require("./models/UserData");
  let userData = await UserData2.findById({ _id: id });
  if (userData != null) {
    res.render("updateNotes", { userData: userData });
  } else {
    res.render("home");
  }
});

// update and save
app.post("/updateNotes/:id", async (req, res) => {
  const id = req.params.id;
  console.log("id update" + id);
  const UserData2 = require("./models/UserData");
  const userData = await UserData2.findByIdAndUpdate(
    { _id: id },
    { Heading: req.body.heading, Note: req.body.note }
  );
  console.log(userData);
  if (userData) {
    const NotesFetch = await UserData2.find();
    console.log(NotesFetch);

    res.render("home", {
      notesData: NotesFetch,
    });
  }
});

// Log Out
app.get("/logOut", (req, res) => {
  res.render("index");
});

app.listen(Port, () => {
  console.log("Server runing on port : http://localhost:" + Port);
});
