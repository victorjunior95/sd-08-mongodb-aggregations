db.movies.aggregate([
  { $match: {
    languages: ["English"],
    "imdb.rating": { $ne: "" } },
  },
  {
    $unwind: "$cast",
  },
  {
    $group: {
      _id: null,
      total: { $sum: 1 },
    //  media: { $avg: "$imdb.rating" },
    },
  },
  /* {
    $project: {
      _id: 1,
      numeroFilmes: { $round: ["$total", 1] },
      mediaIMDB: { $round: ["$media", 1] },

    },
  },
  { $sort: { numeroFilmes: -1, mediaIMDB: -1 } },
 */
]);
