// Desafio 12 - Usando a pipeline anterior que retorna o dia com mais viagens, determine qual
// estação tem o maior número de viagens nesse dia da semana.
//  a) Exiba apenas o nome da estação e o total de viagens.
// Dica: Utilize o operador $dayOfWeek para extrair o dia da semana como um número de uma data.

// O resultado da sua query deve ter o seguinte formato:
// { "nomeEstacao" : <nome_da_estacao>, "total" : <total_de_viagens> }
db.trips.aggregate([
  { $match: { $expr: { $eq: [{ $dayOfWeek: "$startTime" }, 5] } } },
  { $group: {
    _id: "$startStationName",
    total: { $sum: 1 },
  } },
  { $project: {
    _id: 0,
    nomeEstacao: "$_id",
    total: "$total",
  } },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
