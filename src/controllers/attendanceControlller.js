const Attendance = require('../models/attendance');

exports.recordAttendance = (req, res) => {
    const newAttendance = new Attendance(req.body);
    newAttendance.save()
        .then(() => res.send('Attendance recorded successfully!'))
        .catch(err => res.status(500).send('Error saving attendance data.'));
};

exports.getAttendanceRecords = (req, res) => {
    Attendance.find({}, (err, records) => {
        if (err) {
            res.status(500).send('Error retrieving attendance records.');
        } else {
            res.json(records);
        }
    });
};
