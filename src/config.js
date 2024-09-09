const { name } = require("ejs");
const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/Attendance_Task_2024");

//Check if Database Connection is Successful 
connect.then(() => {
    console.log("Database Connnected Successfully");
})
.catch(() => {
    console.log("Database Connnection Failed");
})

//Create a Schema

const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

//Collection Part

const collection = new mongoose.model("User", LoginSchema);

module.exports = collection;
