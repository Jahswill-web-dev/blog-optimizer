const User = require("../models/User");
const jwt = require("jsonwebtoken");

// function that takes in userId params and generates a token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

exports.signup = async (req, res) => {
  try {
    // get the user details
    const { username, email, password } = req.body;
    //check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered." });
    }
    // create user
    const user = await User.create({ username, email, password });
    // generate token for this specific user
    const token = generateToken(user._id);
    // send success message along with user token
    res.status(201).json({ message: "User created successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Signup failed", error: error.message });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Validate password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Generate a token for that specific user
    const token = generateToken(user._id);
    // sucess message with token for user
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};
