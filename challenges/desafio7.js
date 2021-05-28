db.movies.aggregate([
  {
    $match: {
      languages: { $in: ["English"] },
    },
  },
  { $unwind: "$cast" },
  {
    $group: {
      _id: "$cast",
      numero_filmes: { $sum: 1 },
      mediaIMDB: { $avg: "$imdb.rating" },
    },
  },
  {
    $project: {
      numero_filmes: 1,
      mediaIMDB: { $round: ["$mediaIMDB", 1] },
    },
  },
  {
    $sort: { numero_filmes: -1 },
  },
]);
