db.air_alliances.aggregate([
  {
    $unwind: "$airlines",
  },
  {
    $lookup: {
      from: "air_routes",
      let: { airline: "$airlines" },
      pipeline: [
        {
          $match: {
            airplane: { $in: ["747", "380"] },
            $expr: {
              $eq: ["$airline.name", "$$airline"],
            },
          } },
        {
          $project: {
            _id: 0,
            airplane: 1,
          },
        },
      ],
      as: "rotas",
    },
  },
  {
    $group: {
      _id: "$name",
      totalRotas: {
        $sum: { $size: "$rotas" },
      },
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
