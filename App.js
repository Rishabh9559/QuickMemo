const express = require("express");
const Port = 3000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const UserModel = require("./models/User");

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
  res.render("login");
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
        name: req.body.name,
        Email: email,
        Password: req.body.Password,
      });
      await user.save();
      res.render("login");
    }
  } catch (err) {
    console.log(err);
  }
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
    console.log(user);
    if (user) {
      if (user.Password == req.body.Password) {
        module.exports = email;
        // import the data structure schema
        // notes fetch
        const UserData2 = require("./models/UserData");

        const NotesFetch = await UserData2.find();
        console.log(NotesFetch);

        res.render("home", {
          notesData: NotesFetch,
        });
      } else {
        res.send("wrong password");
      }
    }
  } catch {
    res.send("wrong");
  }
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
  let id = req.params.id;
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

app.listen(Port, () => {
  console.log("Server runing on port : http://localhost:" + Port);
});
