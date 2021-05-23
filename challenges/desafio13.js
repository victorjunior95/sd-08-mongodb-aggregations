// Desafio 13 - Determine a duração média das viagens iniciadas no dia 10/03/2016, em minutos.
//  a) Arredonde o resultado para cima.
// O resultado da sua query deve ter o seguinte formato:
// { "duracaoMediaEmMinutos" : <duracao_media_em_minutos> }
const MnToMs = 60000;
db.trips.aggregate([
  { $match: { startTime: { $gte: new Date("2016-03-10"), $lt: new Date("2016-03-11") } } },
  { $group: {
    _id: null,
    duracaoMediaEmMinutos: { $avg: { $subtract: ["$stopTime", "$startTime"] } },
  } },
  { $project: {
    _id: 0,
    duracaoMediaEmMinutos: { $ceil: { $divide: ["$duracaoMediaEmMinutos", MnToMs] } },
  } },
]);
