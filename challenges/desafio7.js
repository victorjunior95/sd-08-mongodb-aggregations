db.movies.aggregate([
  { $match:
    {
      languages: "English",
    },
  },
  { $unwind: "$cast" },
  { $group:
    {
      _id: "$cast",
      numeroFilmes: { $sum: 1 },
      IMDBaverage: { $avg: "$imdb.rating" },
    },
  },
  { $project:
    {
      numeroFilmes: 1,
      mediaIMDB: { $round: ["$IMDBaverage", 1] },
      _id: 1,
    },
  },
  { $sort:
    {
      numeroFilmes: -1,
      _id: -1,
    },
  },
]);
