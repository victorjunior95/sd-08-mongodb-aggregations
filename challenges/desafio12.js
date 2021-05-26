db.trips.aggregate([
  { $addFields: { dayAtWeek: { $dayOfWeek: "$startTime" } } },
  //  necessario primeir adicionar o campo para depois comparar-lo com o valor.
  { $match: { dayAtWeek: 5 } },
  {
    $group: {
      _id: "$startStationName",
      totalOfStartStationName: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id",
      total: "$totalOfStartStationName",
    },
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
//  constultei o repositório de Arnaelcio
//  https://github.com/tryber/sd-08-mongodb-aggregations/pull/57/files
