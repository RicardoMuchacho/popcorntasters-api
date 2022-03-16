const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/user");
const Movie = require("../models/movie");
const Comment = require("../models/comment");
const Rating = require("../models/rating");

dotenv.config({ path: "../.env" });

const PORT = process.env.PORT || 3000;

const dbURI = process.env.MONGO_URI;

/*
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("connected to db");
  })
  .catch((err) => console.log(err));
*/

async function create_movie(id, title, image) {
  const movie = new Movie({
    id: id,
    title: title,
    image: image,
  });
  await movie
    .save()
    .then((result) => {
      console.log(result);
      //res.send(JSON.stringify(result));
    })
    .catch((err) => console.log(err));
}

async function create_top20(
  id,
  title,
  image,
  genres,
  description,
  year,
  rating,
  category,
  trailer
) {
  const movie = new Movie({
    id: id,
    title: title,
    image: image,
    genre: genres,
    description: description,
    year: year,
    rating: rating,
    category: category,
    trailer: trailer,
  });
  await movie
    .save()
    .then((result) => {
      console.log(result);
      //res.send(JSON.stringify(result));
    })
    .catch((err) => console.log(err));
}

async function create_detailed_movie(
  id,
  title,
  image,
  genres,
  description,
  year,
  rating,
  trailer
) {
  const movie = new Movie({
    id: id,
    title: title,
    image: image,
    genre: genres,
    description: description,
    year: year,
    rating: rating,
    trailer: trailer,
  });
  await movie
    .save()
    .then((result) => {
      console.log(result);
      //res.send(JSON.stringify(result));
    })
    .catch((err) => console.log(err));
}

async function create_comment(movie_id, username, description) {
  movie = await Movie.findOne({ id: movie_id });

  title = movie.title;

  const comment = new Comment({
    movie_id: movie_id,
    username: username,
    description: description,
    movie_title: title,
  });
  await comment
    .save()
    .then((result) => {
      console.log(result);
      //res.send(JSON.stringify(result));
    })
    .catch((err) => console.log(err));

  return comment;
}

async function create_rating(movie_id, username, rating) {
  movie = await Movie.findOne({ id: movie_id });

  title = movie.title;

  const new_rating = new Rating({
    username: username,
    movie_id: movie_id,
    rating: rating,
    movie_title: title,
  });
  await new_rating
    .save()
    .then((result) => {
      console.log(result);
      //res.send(JSON.stringify(result));
    })
    .catch((err) => console.log(err));

  return new_rating;
}

async function update_movie(
  movie_id,
  genres,
  description,
  year,
  rating,
  trailer
) {
  try {
    const query = { id: movie_id };

    res = await Movie.findOneAndUpdate(
      query,
      {
        genres: genres,
        description: description,
        year: year,
        rating: rating,
        trailer: trailer,
      },
      {
        new: true,
      }
    );
    //res.send(JSON.stringify(r));
    console.log(res);
  } catch {
    (err) => console.log(err);
  }
}

async function get_movie(movie_id) {
  try {
    res = await Movie.findOne({ id: movie_id });

    //res.send(JSON.stringify(r));
    console.log(res);
    return res;
  } catch {
    (err) => console.log(err);
  }
}

async function get_comments(movie_id) {
  try {
    res = await Comment.find({ movie_id: movie_id });

    //res.send(JSON.stringify(r));
    console.log(res);
  } catch {
    (err) => console.log(err);
  }
  return res;
}

async function delete_comment(id) {
  try {
    res = await Comment.findOneAndDelete({ _id: id });
    //res.send(JSON.stringify("Deleted, " +r));
    console.log("deleted: " + res);
  } catch {
    (err) => console.log(err);
  }
  response = JSON.stringify("deleted: " + res);
  return response;
}
//delete_comment('622acb0621e93e0a38c46b30');

//create_movie(2, "Jackass", "no image");

//create_comment(1, "rickmuch", "too much time");

//update_movie("tt0316654", "action", "spider man movie", 2000, 8.5, "trailer link" );

//get_movie(1);

//get_comments(1);

module.exports = {
  create_top20,
  create_movie,
  update_movie,
  get_movie,
  get_comments,
  create_comment,
  delete_comment,
  create_detailed_movie,
  create_rating,
};
