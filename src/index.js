const express = require('express');
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config");

const app = express();
//Convert Data into json format
app.use(express.json());


app.use(express.urlencoded({ extended: false }));

// EJS as the view engine
app.set('view engine', 'ejs');

//Static File

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("login");
});

app.get("/registration", (req, res) => {
    res.render("registration");
});

//Register User
app.post("/registration",async (req, res) => {

    const data = {
        name: req.body.username,
        password: req.body.password
    }

    //Checking if User is Already Present in the Database
    const existingUser = await collection.findOne({name: data.name});

    if(existingUser) {
        res.send("User already exist.");
    }else {
        //hash the password
    const userdata = await collection.insertMany(data);
    console.log(userdata);
    }
});

const port = 5000;
app.listen(port, () => {
    console.log(`Server running on Port: ${port}`);
});
