db.movies.aggregate([
  {
    $match:
    {
      awards: { $exists: true, $ne: " " },
    },

  },
  {
    $group:
    {
      _id: "$imdb.rating",
      totalRating: { $sum: 1 },
    },
  },
  {
    $project: {
      maior_rating: { _id: [{ $sort: { _id: -1 }, $skip: 1 }] },
    },
  },
]);
