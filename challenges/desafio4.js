db.movies.aggregate([
  {
    $project: { title_split: { $split: ["$title", " "] } },
  },
]);
