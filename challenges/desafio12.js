db.trips.aggregate([
  { $set: { diaDaSemana: { $dayOfWeek: "$startTime" } } },
  { $group: { _id: { diaSemana: "$diaDaSemana", estacao: "$startStationName" }, total: { $sum: 1 } } },
  { $project: { _id: 0, nomeEstacao: "$_id.estacao", total: 1 } },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
