const aggregation = [
  {
    $unwind: "$airlines",
  },
  {
    $lookup: {
      from: "air_routes",
      let: { nome_alliance: "$name", airlines: "$airlines" },
      pipeline: [
        {
          $match: {
            $and: [
              {
                $expr: {
                  $eq: ["$airline.name", "$$airlines"],
                },
              },
              {
                airplane: {
                  $in: ["747", "380"],
                },
              },
            ],
          },
        },
      ],
      as: "resultados",
    },
  },
  { $group: { _id: "$name", totalRotas: { $sum: { $size: "$resultados" } } } },
  { $sort: { totalRotas: -1 } },
  {
    $limit: 1 },
];

db.air_alliances.aggregate(aggregation);
