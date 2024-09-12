const mongoose = require("mongoose");

// Define the Attendance Schema
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

// Create the Attendance Model
const Attendance = mongoose.model("Attendance", AttendanceSchema);

// Export the model
module.exports = Attendance;
