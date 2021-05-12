db.movies.aggregate([
  {
    $match: {
      $and: [
        { "imdb.rating": { $gte: 7 } },
        { genres: { $ne: "Crime" } },
        { genres: { $ne: "Horror" } },
        { rated: { $in: ["PG", "G"] } },
        { $and: [{ languages: "English" }, { languages: "Spanish" }] },
      ],
    },
  },
]);
