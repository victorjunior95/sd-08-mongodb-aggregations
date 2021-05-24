/*
Desafio 14
Baseado na duração média das viagens, determine quais são as 5 bicicletas que foram mais utilizadas.
Exiba o resultado em minutos arredondados para cima e em ordem decrescente.
O resultado da sua query deve ter o seguinte formato:

{ "bikeId" : <bike_id>, "duracaoMedia" : <duracao_media> }
{ "bikeId" : <bike_id>, "duracaoMedia" : <duracao_media> }
{ "bikeId" : <bike_id>, "duracaoMedia" : <duracao_media> }
{ "bikeId" : <bike_id>, "duracaoMedia" : <duracao_media> }
{ "bikeId" : <bike_id>, "duracaoMedia" : <duracao_media> }
*/
const MILLISECONDS_TO_MINUTES = 60 * 1000;
db.trips.aggregate([
  {
    $group: {
      _id: "$bikeid",
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
      bikeId: "$_id",
      duracaoMedia: {
        $ceil: [{ $divide: ["$totalMiliseconds", MILLISECONDS_TO_MINUTES] }] },
    },
  },
  {
    $sort: {
      duracaoMedia: -1,
    },
  },
  {
    $limit: 5,
  },
]);
