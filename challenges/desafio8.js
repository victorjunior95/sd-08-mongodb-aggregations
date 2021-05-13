db.air_alliances.aggregate([
  {
    $unwind: "$airlines",
  },
  {
    $lookup: {
      from: "air_routes",
      localField: "airlines",
      foreignField: "airline.name",
      as: "routeInfo",
    },
  },
  {
    $unwind: "$routeInfo",
  },
  {
    $match: {
      "routeInfo.airplane": { $in: ["747", "380"] },
    },
  },
  {
    $group: {
      _id: "$name",
      count: { $sum: 1 },
    },
  },
  {
    $project: {
      totalRotas: "$count",
    },
  },
  {
    $sort: {
      totalRotas: -1,
    },
  },
  {
    $limit: 1,
  },
]);
