db.air_alliances.aggregate([
  {
    $unwind: "$airlines",
  },
  {
    $lookup: {
      from: "air_routes",
      let: {
        airline: "$airlines",
      },
      pipeline: [
        {
          $match: {
            airplane: { $in: ["747", "380"] },
            $expr: {
              $and: [
                { $eq: ["$$airline", "$airline.name"] },
              ],
            },
          },
        },
      ],
      as: "rotas",
    },
  },
  {
    $match: {
      rotas: { $ne: [] },
    },
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
    $sort: {
      totalRotas: -1,
    },
  },
  {
    $limit: 1,
  },
]);
