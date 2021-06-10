// Utilize a pipeline do desafio 11
// A) Determine qual estação tem o maior número de viagens nesse dia da semana
// B) Exiba apenas o nome da estação e o total de viagens
// Dica: Utilize $dayOfWeek para extrair o dia da semana como um número de uma data

db.trips.aggregate([
  { $addFields: { dayOfWeek: { $dayOfWeek: "$startTime" } } },
  { $match: { dayOfWeek: 5 } },
  {
    $group: {
      _id: "$startStationName",
      total: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id",
      total: "$total",
    },
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
