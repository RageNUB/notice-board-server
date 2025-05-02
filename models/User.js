const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {type: String, require: true},
  name: {type: String, require: true},
  studentId: {type: String, require: true},
  photoURL: String,
  section: {type: String, default: ""},
  batch: {type: String, default: ""},
  role: {
    type: String,
    enum: ["admin", "student"],
    default: "student"
  },
  createdAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model("User", userSchema);