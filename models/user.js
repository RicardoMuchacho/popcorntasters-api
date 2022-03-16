const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  movies: [
    {
      id: String,
      title: String,
    },
  ],
  token: { type: String },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
