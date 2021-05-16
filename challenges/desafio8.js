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
    // https://qastack.com.br/programming/16448175/whats-the-unwind-operator-in-mongodb
    // para cada item do array 'alliance_route', retorna um documento com apenas aquele item
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
  // { $count: "myCount" }
]);
