/*
Desafio 13
Determine a duração média das viagens iniciadas no dia 10/03/2016, em minutos.
Arredonde o resultado para cima.
O resultado da sua query deve ter o seguinte formato:

{ "duracaoMediaEmMinutos" : <duracao_media_em_minutos> }
*/
const MILLISECONDS_TO_MINUTES = 60 * 1000;
db.trips.aggregate([
  {
    $match: {
      startTime: { $gte: ISODate("2016-03-10T00:00:00.000Z"), $lte: ISODate("2016-03-10T23:59:59.999Z") },
    },
  },
  {
    $group: {
      _id: null,
      totalMiliseconds: {
        $avg: {
          $subtract: ["$stopTime", "$startTime"],
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: {
        $ceil: [{ $divide: ["$totalMiliseconds", MILLISECONDS_TO_MINUTES] }] },
    },
  },
]);
