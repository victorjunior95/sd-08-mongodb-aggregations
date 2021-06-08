db.trips.aggregate([
  {
    $lookup: {
      from: "trips",
      let: { diaDaSemana: { $dayOfWeek: "$startTime" } },
      pipeline: [
        {
          $group: {
            _id: { $dayOfWeek: "$startTime" },
            total: { $sum: 1 },
          },
        },
        {
          $sort: { total: -1 },
        },
        {
          $limit: 1,
        },
        {
          $project: {
            _id: 0,
            comMaisViagens: "$_id",
            total: 1,
            atual: "$$diaDaSemana",
          },
        },
      ],
      as: "dia",
    },
  },
  {
    $match: {
      $expr: {
        $eq: ["$dia.comMaisViagens", "$dia.atual"],
      },
    },
  },
  {
    $group: {
      _id: "$startStationName",
      total: { $sum: 1 },
    },
  },
  {
    $sort: { total: -1 },
  },
  {
    $limit: 1,
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id",
      total: "$total",
    },
  },
]);
