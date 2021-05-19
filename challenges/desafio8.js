db.air_alliances.aggregate([
  {
    $lookup: {
      from: "air_routes",
      localField: "airlines",
      foreignField: "airline.name",
      as: "alliance_route",
    },
  },
  {
    $unwind: "$alliance_route",
  },
  {
    $match: {
      $or: [
        { "alliance_route.airplane": { $eq: "747" } },
        { "alliance_route.airplane": { $eq: "380" } },
      ],
    },
  },
  {
    $group: {
      _id: "$name",
      totalRotas: { $sum: 1 },
    },
  },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
