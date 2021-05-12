const favStars = ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"];

db.movies.aggregate([
  { $match: {
    countries: "USA",
    "tomatoes.viewer.rating": { $gte: 3 },
  } },
  { $set: { num_favs: { $setIntersection: ["$cast", favStars] } } },
  { $set: { num_favs: { $cond: {
    if: { $isArray: "$num_favs" },
    then: { $size: "$num_favs" },
    else: 0,
  } } } },
  { $sort: { num_favs: -1, "tomatoes.viewer.rating": -1, title: -1 } },
  { $project: { _id: 0, title: 1 } },
  { $skip: 24 },
  { $limit: 1 },
]);
