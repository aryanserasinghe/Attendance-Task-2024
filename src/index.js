const express = require('express');
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config");
const Attendance = require("./models/attendance"); // Import the Attendance model

const app = express();
//Convert Data into json format
app.use(express.json());


app.use(express.urlencoded({ extended: false }));

// EJS as the view engine
app.set('view engine', 'ejs');

//Static File

app.use(express.static("public"));

// Render Main Page
app.get("/", (req, res) => {
    res.render("login");
});

// Render Registration Page
app.get("/registration", (req, res) => {
    res.render("registration");
});

// Render Login Page
app.get("/login", (req, res) => {
    res.render("login");
});

// Render Attendance Page
app.get("/attendance", (req, res) => {
    res.render("attendance");
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
        //hash the password using bycrypt
        const saltRounds = 10; //Number of salt round for bycrypt
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        //Relplacing the hash password with original password
        data.password = hashedPassword; 
    const userdata = await collection.insertMany(data);
    console.log(userdata);
    }
});

//Login User
app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.username });
        if (!check) {
            return res.send("User Cannot Be Found");
        }

        // Compare the hash password from the database with the plain text
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if (isPasswordMatch) {
            // Send a JavaScript snippet to redirect the user
            res.send(`
                <html>
                    <body>
                        <script>
                            window.location.href = '/attendance';
                        </script>
                    </body>
                </html>
            `);
        } else {
            res.send("Wrong Details");
        }
    } catch (error) {
        res.send("An error occurred");
    }
});

// User Attendance
app.post("/attendance", async (req, res) => {
    try {
        // Create an attendance record
        const attendance = new Attendance({
            username: req.body.username,
            date: req.body.date,
            timein: req.body.timein,
            timeout: req.body.timeout,
            status: req.body.status
        });

        await attendance.save(); // Save the record to the database
        console.log('Attendance recorded:', attendance);
        res.send("Attendance recorded successfully.");
    } catch (error) {
        res.send("An error occurred while recording attendance: " + error.message);
    }
});


const port = 5000;
app.listen(port, () => {
    console.log(`Server running on Port: ${port}`);
});
