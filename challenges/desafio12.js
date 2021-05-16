db.trips.aggregate([
  {
    $group: {
      _id: {
        dia_semana: { $dayOfWeek: "$startTime" },
        nome_estacao: "$startStationName",
      },
      startTrips: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id.nome_estacao",
      total: "$startTrips",
    },
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
  // { $count: "myCount" }
]);
