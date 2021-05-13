db.trips.aggregate([
  {
    $group: {
      _id: { $dayOfWeek: "$startTime" },
      total: { $sum: 1 },
    },
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
  {
    $project: {
      _id: 0,
      diaDaSemana: "$_id",
      total: "$total",
    },
  },
  {
    $lookup: {
      from: "trips",
      let: { diaDaSemana: "$diaDaSemana" },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: [{ $dayOfWeek: "$startTime" }, "$$diaDaSemana"],
            },
          },
        },
        {
          $group: {
            _id: "$startStationName",
            total: { $sum: 1 },
          },
        },
        { $sort: { total: -1 } },
        { $limit: 1 },
      ],
      as: "estacoes",
    },
  },
  { $unwind: "$estacoes" },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$estacoes._id",
      total: "$estacoes.total",
    },
  },
]);
