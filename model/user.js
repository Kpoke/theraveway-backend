const mongoose = require("mongoose");
const passwordHash = require("./passwordPlugin");

//add following, followers
var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
  },
  isAdmin: { type: Boolean, default: false },
  isSuperAdmin: { type: Boolean, default: false },
});

UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject._v;

  return userObject;
};

UserSchema.plugin(passwordHash);

module.exports = mongoose.model("User", UserSchema);
