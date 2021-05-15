db.movies.aggregate([
  { $match: {
    "imdb.rating": { $gte: 7 },
    $nor: [{ genres: "Crime" }, { genres: "Horror" }],
    $or: [{ rated: "G" }, { rated: "PG" }],
    $and: [{ languages: "English" }, { languages: "Spanish" }],
  } },
]);
