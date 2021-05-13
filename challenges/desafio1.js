db.movies.aggregate([
  {
    $match: { $and: [
      { "imdb.rating": { $gte: 7 } },
      { genres: { $nin: ["Crime", "Horror"] } },
      { languages: { $in: ["English", "Spanish"] } },
      { rated: { $in: ["PG", "G"] } },
    ] },
  },
]);
