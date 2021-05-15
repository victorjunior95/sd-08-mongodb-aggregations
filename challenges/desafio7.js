db.movies.aggregate([

  { $match: { languages: "English" } },

  { $unwind: "$cast" },

  { $group: { _id: "$cast", total: { $sum: 1 }, media: { $avg: "$imdb.rating" } } },

  { $project: { _id: 1, numeroFilmes: { $round: ["$total", 1] }, mediaIMDB: { $round: ["$media", 1] } } },

  { $sort: { numeroFilmes: -1, mediaIMDB: -1 } },

  { $limit: 47055 },
]);
