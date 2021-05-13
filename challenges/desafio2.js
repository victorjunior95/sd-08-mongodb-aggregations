db.movies.aggregate([
  {
    $match: {
      "imdb.rating": { $gt: 7 },
      genres: { $nin: ["Crime", "Horror"] },
      languages: { $in: ["English", "Spanish"] },
      rated: { $in: ["PG", "G"] },
    },
  }, {
    $project: {
      titulo: "$title",
      avaliado: "$rated",
      notaIMDB: "$imdb.rating",
      votosIMDB: "$imdb.votes",
      ano: "$year",

    },
  },
]);
