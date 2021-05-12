db.movies.aggregate([
  { $project: {
    _id: false,
    title_split: { $split: ["$title", " "] },
  } },
  {
    $match: {
      title_split: { $size: 1 },
    },
  },
  {
    $sort: {
      title_split: 1,
    },
  },
  // { $group: {
  //   _id: null,
  //   totalDeFilmesPesquisados: { $sum: 1 },
  // },
  // },
]);
