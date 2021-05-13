db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  { $lookup: {
    from: "air_routes",
    let: { alliances_airlines: "$airlines" },
    pipeline: [{ $match: { $expr: { $eq: ["$airline.name", "$$alliances_airlines"] } } }],
    as: "dados",
  } },
  { $unwind: "$dados" },
  { $match: { "dados.airplane": { $in: ["747", "380"] } } },
  { $group: { _id: "$name", totalRotas: { $sum: 1 } } },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
