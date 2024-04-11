const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  email: { type: String },
  password: { type: String },
  birth_date: { type: Date },
  bio: { type: String },
  city: { type: String },
  adress: { type: String },
  gender: { type: String },
  created_on: { type: Date, default: Date.now() },
  phone: { type: Number },
  img: {
    type: String,
    default:
      "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp",
  },
  role: {
    type: String,
    enum: ["teacher", "student"],
    default: "student",
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
