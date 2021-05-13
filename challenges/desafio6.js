db.movies.aggregate([
  {
    $match: {
      awards: {
        $regex: /^Won+\s+\d+\s+Oscar/,
      },
    },
  },
  {
    $group: {
      _id: null,
      maior_rating: { $max: "$imdb.rating" },
      menor_rating: { $min: "$imdb.rating" },
      media_rating: { $round: [{ $avg: "$imdb.rating" }, 2] },
    },
  },
  {
    $project: {
      _id: 0,
      maior_rating: 1,
      menor_rating: 1,
      media_rating: 1,
    },
  },
]);
