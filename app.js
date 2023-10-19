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
// mongoose.connect('mongodb://localhost/library');


app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.get("/login-btn", (req, res) => {
    res.render("index.ejs")
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
})










// Express Server

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})