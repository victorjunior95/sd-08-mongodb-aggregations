db.movies.aggregate([
  {
    $addFields: {
      title_split: {
        $split: ["$title", " "],
      },
    },
  },
  // {
  //   $addFields: {

  //   }
  // },
  {
    $match: {
      title_split: { },
    },
  },
  {
    $sort: { title: -1 },
  },
  {
    $project: {
      _id: 0,
      title_split: 1,
    },
  },
]);
