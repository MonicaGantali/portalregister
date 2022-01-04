const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
//import cors from "cors";
const cors = require("cors");
const users = require("./routes/api/users");
require("dotenv").config();
const app = express();


app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );

app.use(bodyParser.json());

//const dbURL =  "mongodb://localhost:27017/Patient";
const db = require("./config/keys").mongoURI;
//connect to MongoDB
mongoose
    .connect(db,
    {useNewUrlParser: true }
    )
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);

//if(process.env.NODE_ENV === 'production') {
   
 // app.use(express.static(path.join(__dirname, "client", "build")))

  //app.get('*',(req, res) => {
    //  res.sendFile(path.join(__dirname,'client','build','index.html'));
  //});
//}


const port = process.env.PORT || 3000;

app.listen(port,()=>console.log(`Server up and running on port ${port}`));