var express = require("express");
var router = express.Router();
const dotenv = require("dotenv");
var Movie = require("../models/movie");
var Comment = require("../models/comment");
var Rating = require("../models/rating");
const db = require("../helpers/db.js");
const api = require("../helpers/api.js");

var router = express.Router();

router.get("/", async (req, res) => {
  r = await Movie.find();
  res.send(JSON.stringify(r));
});

router.get("/top20", async (req, res) => {
  r = await Movie.find({ category: "top20" });
  res.send(JSON.stringify(r));
});

router.get("/:title", async (req, res) => {
  movie_title = req.params.title;

  r = await Movie.find({ title: { $regex: movie_title, $options: "i" } });
  if (!r || r == null || r == "") {
    r = await api.movies_by_title(movie_title);
  }
  res.send(JSON.stringify(r));
});

router.get("/details/:id", async (req, res) => {
  movie_id = req.params.id;

  r = await Movie.findOne({ id: movie_id });
  if (!r.description || r.description == null) {
    r = await api.movie_details(movie_id);
  }
  comments = await Comment.find({ movie_id: movie_id });
  ratings = await Rating.find({ movie_id: movie_id });

  res.send(
    '{"details":' +
      JSON.stringify(r) +
      ', "comments":' +
      JSON.stringify(comments) +
      ', "ratings":' +
      JSON.stringify(ratings) +
      "}"
  );
});

router.post("/comment/:id", async (req, res) => {
  movie_id = req.params.id;
  movie_title = req.body.title;
  username = req.body.username;
  description = req.body.description;

  r = await db.create_comment(movie_id, username, description);
  res.send(JSON.stringify(r));
});

router.delete("/comment/:id", async (req, res) => {
  comment_id = req.params.id;

  r = await db.delete_comment(comment_id);
  res.send(JSON.stringify(r));
});

module.exports = router;
