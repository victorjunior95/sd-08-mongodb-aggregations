db.movies.aggregate([
  {
    $match: { $and: [
      { "imdb.rating": { $gte: 7 } },
      { genres: { $nin: ["Crime", "Horror"] } },
      { languages: { $all: ["English", "Spanish"] } },
      { rated: { $in: ["PG", "G"] } },
    ] },
  },
  {
    $project: {
      titulo: "$title",
      avaliado: "$rated",
      notaIMDB: "$imdb.rating",
      votosIMDB: "$imdb.votes",
      ano: "$year",
      _id: 0,
    },
  },
]);
