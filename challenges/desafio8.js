db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  { $lookup: {
    from: "air_routes",
    let: { airline: "$airlines" },
    pipeline: [
      { $match: {
        $expr: { $eq: ["$$airline", "$airline.name"] },
        airplane: { $in: ["747", "380"] },
      } },
    ],
    as: "routes",
  } },
  { $match: { $nor: [{ routes: { $size: 0 } }] } },
  { $group: { _id: "$name", totalRotas: { $sum: { $size: "$routes" } } } },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
