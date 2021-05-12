db.movies.aggregate([
  {
    $match: {
      cast: { $in: [
        "Sandra Bullock", "Tom Hanks",
        "Julia Roberts", "Kevin Spacey",
        "George Clooney",
      ] },
      countries: "USA",
      "tomatoes.viewer.rating": { $gte: 3 },

    },
  },
  { $unwind: "$cast" },
  {
    $match: {
      cast: { $in: [
        "Sandra Bullock", "Tom Hanks",
        "Julia Roberts", "Kevin Spacey",
        "George Clooney",
      ] },
    },
  },
  {
    $group: {
      _id: "$title",
      num_favs: { $sum: 1 },
      rating: { $first: "$tomatoes.viewer.rating" },
    },
  },
  {
    $sort: {
      num_favs: -1,
      rating: -1,
      _id: -1,
    },
  },
  {
    $skip: 24,
  },
  {
    $limit: 1,
  },
  {
    $project: {
      _id: 0,
      title: "$_id",
    },
  },
]);
