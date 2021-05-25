db.air_routes.aggregate([
  { $match: { airplane: { $in: ["747", "380"] } } },
  { $lookup: {
    from: "air_alliances",
    localField: "airline.name",
    foreignField: "airlines",
    as: "airAlliances",
  } },
  { $unwind: "$airAlliances" },
  { $group: {
    _id: "$airAlliances.name",
    total_rotas: { $sum: 1 },
  } },
  { $sort: { total_rotas: -1 } },
  { $limit: 1 },
]);
