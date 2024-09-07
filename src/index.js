const express = require('express');
const path = require("path");
const bcrypt = require("bcrypt");

const app = express();

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



const port = 5000;
app.listen(port, () => {
    console.log(`Server running on Port: ${port}`);
});
