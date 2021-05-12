db.air_alliances.aggregate([
  {
    $unwind: "$airlines",
  },
  {
    $lookup: {
      from: "air_routes",
      let: { alliances_airlines: "$airlines" },
      pipeline: [
        {
          $match: {
            $expr: { $eq: ["$$alliances_airlines", "$airline.name"] },
            airplane: { $in: ["747", "380"] },
          },
        },
      ],
      as: "rotas",
    },
  },
  {
    $match: { "rotas.airplane": { $in: ["747", "380"] } },
  },
  {
    $unwind: "$rotas",
  },
  {
    $group: {
      _id: "$name",
      totalRotas: { $sum: 1 },
    },
  },
  {
    $sort: { totalRotas: -1 },
  },
  {
    $limit: 1,
  },
]);
