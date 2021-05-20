db.trips.aggregate(
  {
    $group: {
      _id: {
        $dayOfWeek: "$startTime",
      },
      total: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      diaDaSemana: "$_id",
      total: "$total",
    },
  },
  {
    $sort: {
      total: -1,
    },
  },
  {
    $limit: 1,
  },
  {
    $lookup: {
      from: "trips",
      let: { diaDaSemana: "$diaDaSemana" },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: [
                { $dayOfWeek: "$startTime" },
                "$$diaDaSemana",
              ],
            },
          },
        },
        {
          $group: {
            _id: "$startStationName",
            totalDeViagens: { $sum: 1 },
          },
        },
      ],
      as: "viagens",
    },
  },
  { $unwind: "$viagens" },
  { $sort: { "viagens.totalDeViagens": -1 } },
  { $limit: 1 },
  {
    $project: {
      nomeEstacao: "$viagens._id",
      total: "$viagens.totalDeViagens",
    },
  },
);
