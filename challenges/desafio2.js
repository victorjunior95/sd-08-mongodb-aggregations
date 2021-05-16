db.movies.aggregate([
  {
    $match: {
      "imdb.rating": { $gte: 7 },
      $nor: [{ genres: "Crime" }, { genres: "Horror" }],
      $or: [{ rated: "PG" }, { rated: "G" }],
      $and: [{ languages: "English" }, { languages: "Spanish" }],
    },
  },
  {
    $project: {
      _id: 0,
      titulo: "$title",
      avaliado: "$rated",
      notaIMDB: "$imdb.rating",
      votosIMDB: "$imdb.votes",
      ano: "$year",
    },
  },
  // { $count: "myCount" }
]);
