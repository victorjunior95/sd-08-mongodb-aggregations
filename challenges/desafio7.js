db.movies.aggregate([
  {
    $match: {
      languages: "English",
    },
  },
  {
    $unwind: "$cast",
  },
  {
    $group: {
      _id: "$cast",
      numeroFilmes: {
        $sum: 1,
      },
      mediaIMDB: {
        $avg: "$imdb.rating",
      },
    },
  },
  {
    $project: {
      numeroFilmes: {
        $sum: 1,
      },
      mediaIMDB: {
        $round: ["$mediaIMDB", 1],
      },
    },
  },
  {
    $sort: {
      _id: -1,
      numeroFilmes: -1,
    },
  },
]);
