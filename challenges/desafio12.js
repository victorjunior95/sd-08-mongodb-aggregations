db.trips.aggregate([
  {
    $group: {
      _id: {
        diaSemana: { $dayOfWeek: "$startTime" },
        nome_da_estacao: "$startStationName",
      },
      total_de_viagens: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id.nome_da_estacao",
      total: "$total_de_viagens",
    },
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
