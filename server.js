require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(()=>console.log("connected to mongoose ✅"))
    .catch((err)=> console.error("❌MongoDB connection failed:", err));

app.set("view engine", "ejs");

//Middlewares 
// app.use(logger);
// app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res)=>{
    res.send("Yo!!! server is good to go!!!")
})



app.listen(PORT, ()=>{
    console.log("server started on port 5000")
})