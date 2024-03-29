const fetch = require("node-fetch");
const Movie = require("../models/movie");
const db = require("./db.js");
const dotenv = require('dotenv');

const movies_list = " ";

//https://imdb-api.com/API/SearchMovie/API_KEY/Uncharted

const movies_by_title = async (title) => {
  const response = await fetch(
    "https://imdb-api.com/API/SearchMovie/" + process.env.API_KEY + "/" + title,
    {
      method: "GET",
    }
  );
  const r = await response.json();
  if (!r || r == null) {
    err = JSON.stringify("Movie not found");
    return err;
  }
  var movies = [];
  console.log(r);

  r.results.forEach((movie) => {
    var movie = {
      id: movie.id,
      title: movie.title,
      image: movie.image,
      //year: movie.year,
      //rating: movie.imDbRating,
    };
    db.create_movie(movie.id, movie.title, movie.image);
    movies.push(movie);
  });
  return movies;
};

async function popular_movies() {
  var movies = [Movie];

  fetch("https://imdb-api.com/en/API/MostPopularMovies/" + process.env.API_KEY, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then((r) => {
      for (let i = 0; i < 20; i++) {
        console.log(r.items[i].id);
        //console.log(r.items[i].title);
        //console.log(r.items[i].image);
        //console.log(r.items[i].year);
        //console.log(r.items[i].imDbRating);

        var movie = new Movie({
          id: r.items[i].id,
          title: r.items[i].title,
          image: r.items[i].image,
          rating: r.items[i].imDbRating,
          year: r.items[i].year,
        });
        movies.push(movie);
      }
      //console.log(movies);
    })
    .catch((e) => console.log(e));

  return movies;
}

//https://imdb-api.com/en/API/Title/API_KEY/tt1877830/Trailer
async function movie_details(movie_id) {
  const response = await fetch(
    "https://imdb-api.com/en/API/Title/" +
      process.env.API_KEY +
      "/" +
      movie_id +
      "/Trailer",
    {
      method: "GET",
    }
  );
  const r = await response.json();
  full_movie = db.update_movie(
    r.id,
    r.genres,
    r.plot,
    r.year,
    r.imDbRating,
    r.trailer.linkEmbed
  );
  //console.log(full_movie);

  var movie = {
    id: r.id,
    title: r.title,
    image: r.image,
    genre: r.genres,
    description: r.plot,
    year: r.year,
    rating: r.imDbRating,
    trailer: r.trailer.linkEmbed,
  };

  return movie;
}

async function test() {
  //const r = await movies_by_title("Batman");
  //const r = await movie_details("tt5108870");
  //console.log(JSON.stringify(r));
}

module.exports = { movie_details, movies_by_title, popular_movies };
