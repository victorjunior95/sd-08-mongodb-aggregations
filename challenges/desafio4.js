db.movies.aggregate([
  { $project: { _id: 1, title_split: { $split: ["$title", " "] } } },
]);
