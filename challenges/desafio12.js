db.trips.aggregate([
  {
    $group: {
      _id: {
        diaDaSemana: { $dayOfWeek: "$startTime" },
        nomeEstacao: "$startStationName",
      },
      somaDias: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      diaDaSemana: "$_id.diaDaSemana",
      nomeEstacao: "$_id.nomeEstacao",
      total: "$somaDias",
    },
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
