import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";


// Variable Declaration 
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
// Connect to MongoDB database using Mongoose
mongoose.connect('mongodb://localhost/library');


app.get("/", (req, res) => {
    res.render("index.ejs");
})













// Express Server

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})