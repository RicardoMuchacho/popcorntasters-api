var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const db = require("../helpers/db.js");
var User = require("../models/user");
var Comment = require("../models/comment");
var Rating = require("../models/rating");

var router = express.Router();

router.get("/", async (req, res) => {
  res.send("user route");
});

router.put("/:user", async (req, res) => {
  try {
    prev_username = req.params.user;
    new_name = req.body.name;
    new_username = req.body.username;
    new_password = req.body.password;

    encrypted_password = await bcrypt.hash(new_password, 10);

    const query = { username: prev_username };

    r = await User.findOneAndUpdate(
      query,
      { name: new_name, username: new_username, password: encrypted_password },
      {
        new: true,
      }
    );
    res.send(JSON.stringify(r));
  } catch {
    (err) => console.log(err);
  }
});

router.delete("/:user", async (req, res) => {
  try {
    delete_username = req.params.user;
    //r = await Animal.deleteOne({ name: delete_name});

    r = await User.findOneAndDelete({ username: delete_username });
    res.send(JSON.stringify("Deleted, " + r));
  } catch {
    (err) => console.log(err);
  }
});

router.get("/:user", async (req, res) => {
  username = req.params.user;
  r = await User.findOne({ username: username });
  res.send(JSON.stringify(r));
});

router.get("/:user/comments", async (req, res) => {
  username = req.params.user;
  r = await Comment.find({ username: username });
  res.send(JSON.stringify(r));
});

router.put("/:user/movies", async (req, res) => {
  username = req.params.user;
  movie_id = req.body.id;
  movie_title = req.body.title;
  is_added = false;
  const query = { username: username };

  r = await User.findOne(query);
  user_movies = r.movies;
  user_movies.forEach((i) => {
    if (i.id == movie_id) {
      return (is_added = true);
    }
  });
  if (is_added == true) {
    return res.send(JSON.stringify("Movie already added"));
  } else {
    r = await User.findOneAndUpdate(
      query,
      { $push: { movies: { id: movie_id, title: movie_title } } },
      {
        new: true,
      }
    );
  }
  res.send(JSON.stringify(r));
});

router.post("/:user/movies", async (req, res) => {
  username = req.params.user;
  movie_id = req.body.id;
  movie_title = req.body.title;
  const query = { username: username };

  r = await User.findOneAndUpdate(
    query,
    { $pull: { movies: [{ id: movie_id }] } },
    {
      new: true,
    }
  );
  res.send(JSON.stringify(r));
});

router.get("/:user/movies", async (req, res) => {
  username = req.params.user;

  r = await User.findOne({ username: username });
  console.log(r);

  user_movies = r.movies;
  if (!user_movies || user_movies == "") {
    return res.send(JSON.stringify("No movies added yet"));
  }
  res.send(JSON.stringify(user_movies));
});

router.post("/:user/ratings", async (req, res) => {
  username = req.params.user;
  new_rating = req.body.rating;
  movie_id = req.body.id;

  const query = { username: username, movie_id: movie_id };

  r = await Rating.findOneAndUpdate(
    query,
    { rating: new_rating },
    {
      new: true,
    }
  );
  if (!r || r == "") {
    r = await db.create_rating(movie_id, username, new_rating);
  }

  res.send(JSON.stringify(r));
});

router.get("/:user/ratings", async (req, res) => {
  username = req.params.user;

  r = await Rating.find({ username: username });

  if (!r || r == "") {
    return res.send(JSON.stringify("No ratings yet"));
  }
  res.send(JSON.stringify(r));
});

module.exports = router;
