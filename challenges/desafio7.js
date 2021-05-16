db.movies.aggregate([
  {
    $match: {
      languages: "English",
    },
  },
  {
    // https://qastack.com.br/programming/16448175/whats-the-unwind-operator-in-mongodb
    // para cada item do array 'cast', retorna um documento com apenas aquele item
    $unwind: "$cast",
  },
  {
    $group: {
      _id: "$cast",
      numeroFilmes: { $sum: 1 },
      mediaIMDB: { $avg: "$imdb.rating" },
    },
  },
  {
    $project: {
      _id: 1,
      numeroFilmes: 1,
      mediaIMDB: { $round: ["$mediaIMDB", 1] },
    },
  },
  {
    $sort: { numeroFilmes: -1, _id: -1 },
  },
  // { $count: "myCount" }
]);
