const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
// defins structure of the user data
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
// middleware code that hashes password just before it is saved 
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
// compares the password
UserSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };

module.exports = mongoose.model("User", UserSchema);
