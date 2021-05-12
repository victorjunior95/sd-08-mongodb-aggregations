const actors = [
  "Sandra Bullock",
  "Tom Hanks",
  "Julia Roberts",
  "Kevin Spacey",
  "George Clooney",
];

db.movies.aggregate([
  {
    $match: {
      countries: { $in: ["USA"] },
      "tomatoes.viewer.rating": { $gte: 3 },
    },
  },
  {
    $addFields: {
      // https://docs.mongodb.com/manual/reference/operator/aggregation/setIntersection/
      // https://docs.mongodb.com/manual/reference/operator/aggregation/size/
      num_favs: {
        $cond: {
          if: { $isArray: "$cast" },
          then: { $size: { $setIntersection: ["$cast", actors] } },
          else: 0,
        },
      },
    },
  },
  {
    $sort: {
      num_favs: -1,
      "tomatoes.viewer.rating": -1,
      title: -1,
    },
  },
  {
    // https://docs.mongodb.com/manual/reference/operator/aggregation/skip/
    $skip: 24,
  },
  {
    // https://docs.mongodb.com/manual/reference/operator/aggregation/limit/
    $limit: 1,
  },
  {
    $project: {
      _id: 0,
      title: 1,
    },
  },
]);
