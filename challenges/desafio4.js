db.movies.aggregate([
  {
    $addFields: {
      // https://docs.mongodb.com/manual/reference/operator/aggregation/split/
      title_split: { $split: ["$title", " "] },
    },
  },
  {
    $match: {
      // https://docs.mongodb.com/manual/reference/operator/aggregation/size/
      title_split: { $size: 1 },
    },
  },
  {
    $sort: {
      title: 1,
    },
  },
]);
