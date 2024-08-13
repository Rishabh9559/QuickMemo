// import the package
const express = require("express");
const Port = 3000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const UserModel = require("./models/User");

const app = express();

// databse connection mongoosedb
mongoose.connect("mongodb://localhost:27017/QuickMomo").then(() => {
  console.log("Connect to DataBase");
});

// ejs stablised
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
    const email = req.body.Email;
    console.log("Email is " + email);

    const user = await UserModel.create({
      name: req.body.name,
      Email: req.body.Email,
      Password: req.body.Password,
    });

    if (user.name != null) {
      res.render("login");
    } else {
      app.get("/", (req, res) => {
        res.render("index");
      });
    }
  } catch (err) {
    console.log(err);
  }
});

// login

app.post("/login", async (req, res) => {
  try {
    // email
    const email = req.body.Email;

    console.log("login email :" + email);

    const user = await UserModel.findOne({ Email: email });
    console.log(user);
    if (user) {
      if (user.Password == req.body.Password) {
        // export the variable other page to data base schema name
        module.exports = email;
        res.render("addNotes");
      } else {
        res.send("wrong password");
      }
    }
  } catch {
    res.send("wrong");
  }
});


// import the data structure schema
const UserData = require("./models/UserData");

//data fetch for notes

// app.post("/home", async (req, res) => {
//   // import the data structure schema
//   const UserData = require("./models/UserData");

//   const NotesFetch = await UserData.find();
//   console.log(NotesFetch);

// });


//Insert Notes
app.post("/addNotes", async (req, res) => {

  const insertData = await UserData.create({
    Heading: req.body.heading,
    Note: req.body.note,
  });
  console.log("data store ");
  res.render("home");

});



app.listen(Port, () => {
  console.log("Server runing on port : http://localhost:" + Port);
});
