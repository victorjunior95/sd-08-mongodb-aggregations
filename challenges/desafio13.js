// Desafio 13 - Determine a duração média das viagens iniciadas no dia 10/03/2016, em minutos.
//  a) Arredonde o resultado para cima.
// O resultado da sua query deve ter o seguinte formato:
// { "duracaoMediaEmMinutos" : <duracao_media_em_minutos> }
const HrToMs = 3600000;
db.trips.aggregate([
  { $match: { startTime: { $gte: new Date("2016-03-10"), $lt: new Date("2016-03-11") } } },
  { $group: {
    _id: null,
    duracaoMediaEmMinutos: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, HrToMs] },
  } },
  { $project: {
    _id: 0,
    duracaoMediaEmMinutos: { $ceil: { $avg: "$duracaoMediaEmMinutos" } },
  } },
]);
