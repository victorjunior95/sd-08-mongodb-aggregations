db.air_routes.aggregate([
  {
    $match: { airplane: { $in: ["747", "380"] } },
  },
  {
    $group: {
      _id: "$airline.name",
      totalRotas: { $sum: 1 },
    },
  },
  {
    $lookup: {
      from: "air_alliances",
      localField: "_id",
      foreignField: "airlines",
      as: "air_alliance",
    },
  },
  {
    $match: { air_alliance: { $not: { $size: 0 } } },
  },
  {
    $group: {
      _id: "$air_alliance.name",
      totalRotas: { $sum: "$totalRotas" },
    },
  },
  {
    $sort: { totalRotas: -1 },
  },
  {
    $limit: 1,
  },
]);
