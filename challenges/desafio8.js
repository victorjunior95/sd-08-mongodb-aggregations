db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  {
    $lookup: {
      from: "air_routes",
      localField: "airlines",
      foreignField: "airline.name",
      as: "rotas_airlines",
    },
  },
  { $unwind: "$rotas_airlines" },
  { $match: { "rotas_airlines.airplane": { $in: ["747", "380"] } } },
  { $group: { _id: "$name", totalRotas: { $sum: 1} } },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
