db.movies.aggregate([
  { $project: { title: { $split: ["$title", " "] } } },
  { $match: { title: { $size: 1 } } },
  { $project: { title_split: "$title", _id: 0 } },
  { $sort: { title_split: 1 } },
]);
