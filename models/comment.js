const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  movie_id: {
    type: String,
    required: true,
  },
  movie_title: {
    type: String,
    required: true,
  },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
