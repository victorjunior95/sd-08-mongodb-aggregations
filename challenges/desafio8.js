db.air_routes.aggregate([
  {
    $lookup: {
      from: "air_alliances",
      localField: "airline.name",
      foreignField: "airlines",
      as: "alliances",
    },
  },
  {
    $match: {
      airplane: { $in: ["747", "380"] },
      "alliances.name": { $exists: true },
    },
  },
  {
    $unwind: "$alliances",
  },
  {
    $group: {
      _id: "$alliances.name",
      totalRotas: { $sum: 1 },
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
