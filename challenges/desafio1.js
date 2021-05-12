db.movies.aggregate([
  { $match: {
    $and: [
      { "imdb.rating": { $gte: 7 } },
      { genres: { $not: { $all: ["Crime"] } } },
      { genres: { $not: { $all: ["Horror"] } } },
      { rated: { $in: ["PG", "G"] } },
      { languages: { $all: ["English", "Spanish"] } },
    ],
  } },
]);
