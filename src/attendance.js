const { name } = require("ejs");
const mongoose = require("mongoose");
const collection = require("./config");
const connect = mongoose.connect("mongodb://localhost:27017/Attendance_Task_2024");

const AttendanceSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    timein: {
        type: String,
        required: true
    },
    timeout: {
        type: String,
        required: false
    },
    status: {
        type: String,
        enum: ['Present', 'Absent'],
        required: true
    }
});

const Attendance = mongoose.model("Attendance", AttendanceSchema);

module.exports = collection;
