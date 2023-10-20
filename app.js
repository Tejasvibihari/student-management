import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";


// Variable Declaration 
const app = express();
const port = 3000;
const username = "tejasvi";
const password = 1234;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


// Connect to MongoDB database using Mongoose

mongoose.connect("mongodb://127.0.0.1:27017/libraryDB")
    .then(() => {
        console.log("Database Created succesfully");
    })
    .catch((err) => {
        console.log(err);
    });

// Create schema for student detail

const studentSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    mobilenumber: Number,
    vill: String,
    city: String,
    state: String,
    pincode: Number,
    dateofenrollment: Date,
    amountpaid: {
        type: Number,
        min: 300,
        max: 1000
    },
    shift: String

});

const Student = mongoose.model("Student", studentSchema);


app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.get("/login-btn", (req, res) => {
    res.render("index.ejs")
})

app.get("/showdetail", (re, res) => {
    Student.find({})
        .then((studentDetail) => {
            res.render("detail.ejs", ({ student: studentDetail }));
        })
        .catch((err) => {
            console.log(err);
        })

})

app.post("/login", (req, res) => {
    const formusername = req.body["username"];
    const formpassword = req.body["password"];

    if (formpassword == password && formusername == username) {
        res.render("admin.ejs");
    }
    else (
        res.render("login-error.ejs")
    )
});

app.post("/admin", (req, res) => {

    const firstname = req.body["first-name"];
    const lastname = req.body["last-name"];
    const email = req.body["email"];
    const mobilenumber = req.body["mobile-number"];
    const vill = req.body["vill"];
    const city = req.body["city"];
    const state = req.body["state"];
    const pincode = req.body["pincode"];
    const enrollment = req.body["enrollment-date"];
    const amount = req.body["amount-paid"];
    const shift = req.body["shift"];

    const student = new Student({
        firstname: firstname,
        lastname: lastname,
        email: email,
        mobilenumber: mobilenumber,
        vill: vill,
        city: city,
        state: state,
        pincode: pincode,
        dateofenrollment: enrollment,
        amountpaid: amount,
        shift: shift

    });
    student.save()
        .then(() => {
            console.log("Data saved succesfully in to the collection");
        })
        .catch((err) => {
            console.log(err);
        })

    res.redirect("/")
});










// Express Server

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})