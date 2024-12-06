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
    resetPasswordToken: String, 
    resetPasswordExpires: Date,
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

//create password reset token
UserSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // Token valid for 10 minutes
  return resetToken;
};

module.exports = mongoose.model("User", UserSchema);
