db.movies.aggregate([
  {
    $addFields: {
      // https://database.guide/mongodb-split/
      title_split: { $split: ["$title", " "] },
    },
  },
  {
    $match: {
      title_split: { $size: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      title_split: 1,
    },
  },
  {
    $sort: { title_split: 1 },
  },
  // { $count: "myCount" }
]);
