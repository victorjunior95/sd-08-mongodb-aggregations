db.trips.aggregate([
  { $addFields: { diaDaSemana: { $dayOfWeek: "$startTime" } } },
  { $group: { _id: { diaDaSemana: "$diaDaSemana", nomeEstacao: "$startStationName" }, total: { $sum: 1 } } }, // metodo _id recebendo um objeto visto no projeto do amigo Ediberto BO
  { $project: { _id: 0, nomeEstacao: "$_id.nomeEstacao", total: "$total" } },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
