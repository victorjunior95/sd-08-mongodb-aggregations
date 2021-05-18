// https://www.w3resource.com/mongodb/aggregation/mongodb-aggregatrion-setintersection-operator.php

const atoresFavoritos = [
  "Sandra Bullock",
  "Tom Hanks",
  "Julia Roberts",
  "Kevin Spacey",
  "George Clooney",
];
db.movies.aggregate([
  {
    $match: {
      $and: [
        { countries: "USA" },
        { "tomatoes.viewer.rating": { $gte: 3 } },
        { cast: { $in: atoresFavoritos } },
      ],
    },
  },
  {
    $addFields: {
      listaAtores: { $setIntersection: ["$cast", atoresFavoritos] },
    },
  },
  {
    $addFields: {
      num_favs: { $size: ["$listaAtores"] },
    },
  },
  { $sort: { num_favs: -1, "tomatoes.viewer.rating": -1, title: -1 } },
  { $project: { _id: 0, title: 1 } },
  { $skip: 24 },
  { $limit: 1 },
]);
