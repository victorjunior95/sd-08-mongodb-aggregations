db.air_routes.aggregate([
  { $match: { airplane: { $in: ["747", "380"] } } },
  {
    $lookup: {
      from: "air_alliances",
      localField: "airline.name",
      foreignField: "airlines",
      as: "alliance_routes",
    },
  },
  { $match: { "alliance_routes.name": { $exists: true } } },
  { $unwind: "$alliance_routes" },
  {
    $group: {
      _id: "$alliance_routes.name",
      totalRotas: { $sum: 1 },
    },
  },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
  { $project: { _id: 1, totalRotas: 1 } },
]);
