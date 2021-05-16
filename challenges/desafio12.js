db.trips.aggregate([
  { $addFields: { diaDaSemana: { $dayOfWeek: { date: "$startTime" } } } },
  { $group: { _id: { diaDaSemana: "$diaDaSemana", estacao: "$startStationName" }, total: { $sum: 1 } } },
  { $sort: { total: -1 } },
  { $limit: 1 },
  { $project: {
    _id: 0,
    nomeEstacao: "$_id.estacao",
    total: "$total",
  } },
]);
