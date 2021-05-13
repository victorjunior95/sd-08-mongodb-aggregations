db.movies.aggregate([
  {
    $match: {
      $and: [
        {
          "imdb.rating": { $gte: 7 },
        },
        {
          genres: { $nin: ["Crime", "Horror"] },
        },
        { 
          rated: { $in: ["PG", "G"] },
        },
        {
          languages: { $all: ["English", "Spanish"] },
        },
      ],
    },
  },
  {
    $limit: 41,
  },
  {
    $project: {
      titulo: "$title",
      avaliado: "$rated",
      notaIMDB: "$imdb.rating",
      votosIMDB: "$imdb.votes",
      ano: "$year", _id: 0,
    },
  },
]);
