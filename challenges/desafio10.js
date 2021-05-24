/*
Desafio 10
Encontre a média de viagens por tipo de usuário.
Exiba o valor em horas com apenas duas casas decimais
Exiba a média de viagens ordenada de forma crescente.
Para arredondar a média use o $round.

O resultado da sua query deve ter o seguinte formato:

{ "tipo" : <tipo>, "duracaoMedia" : <duracaoMedia> }
// ...
*/
const MILLISECONDS_TO_HOUR = 60 * 60 * 1000;
db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
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
      tipo: "$_id",
      duracaoMedia: {
        $round: [{ $divide: ["$totalMiliseconds", MILLISECONDS_TO_HOUR] }, 2] },
    },
  },
  {
    $sort: {
      duracaoMedia: 1,
    },
  },
]);
