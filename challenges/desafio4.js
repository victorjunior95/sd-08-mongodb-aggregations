db.movies.aggregate([
  {
    $addFields: {
      title_split: {
        $split: ["$title", " "],
      },
    },
  },
  {
    $match: {
      "title_split.1": { $exists: false },
    },
  },
  {
    $sort: { "title_split.0": 1 },
  },
  {
    $project: {
      _id: 0,
      title_split: 1,
    },
  },
]);
