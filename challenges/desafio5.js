const atores = ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"];
db.movies.aggregate([
  { $match: { countries: { $in: ["USA"] }, "tomatoes.viewer.rating": { $gte: 3 }, cast: { $exists: true } } },
  { $addFields: { num_favs: { $size: { $setIntersection: [atores, "$cast"] } } } },
  { $sort: { num_favs: -1, "_id.viewer_rating": -1, "_id.title": -1 } },
  { $project: { title: 1, _id: 0 } },
  { $skip: 24 },
  { $limit: 1 },
]);
