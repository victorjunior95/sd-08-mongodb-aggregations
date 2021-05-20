db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  {
    $lookup: {
      from: "air_routes",
      let: { airline: "$airlines" },
      pipeline: [
        {
          $match: {
            airplane: { $in: ["747", "380"] },
            $expr: { $eq: ["$airline.name", "$$airline"] },
          },
        },
      ],
      as: "routes",
    },
  },
  { $project: { _id: 0, name: 1, routes: { $size: "$routes" } } },
  {
    $group: {
      _id: "$name",
      totalRotas: { $sum: "$routes" },
    },
  },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
