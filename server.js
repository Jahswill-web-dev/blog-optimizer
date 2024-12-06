require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("connected to mongoose ✅"))
  .catch((err) => console.error("❌MongoDB connection failed:", err));

app.set("view engine", "ejs");

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);

app.get("/", (req, res) => {
  res.send("Yo!!! server is good to go!!!");
});

app.listen(PORT, () => {
  console.log("server started on port 5000");
});
