const atoresFavoritos = [
  "Sandra Bullock",
  "Tom Hanks",
  "Julia Roberts",
  "Kevin Spacey",
  "George Clooney",
];

db.movies.aggregate([
  { $match: {
    $and: [
      { countries: { $elemMatch: { $eq: "USA" } } },
      { "tomatoes.viewer.rating": { $gte: 3 } },
    ] },
  },
  { $addFields: {
    num_favs: { $setIntersection: ["$cast", atoresFavoritos] } },
  },
  { $match: {
    num_favs: { $ne: null, $elemMatch: { $in: atoresFavoritos } } },
  },
  { $addFields: {
    num_favs: { $size: "$num_favs" } } },
  { $sort: {
    num_favs: -1,
    "tomatoes.viewer.rating": -1,
    title: -1 } },
  { $skip: 24 },
  { $project: { _id: 0, title: 1 } },
  { $limit: 1 },
]);
