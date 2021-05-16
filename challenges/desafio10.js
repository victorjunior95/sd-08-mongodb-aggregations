// Encontre a média de viagens por tipo de usuário.
// Exiba o valor em horas com apenas duas casas decimais
// Exiba a média de viagens ordenada de forma crescente.
// Para arredondar a média use o $round.

// O resultado da sua query deve ter o seguinte formato:

// { "tipo" : <tipo>, "duracaoMedia" : <duracaoMedia> }
// // ...

db.trips.aggregate(
  [
    {
      $group: {
        _id: "$usertype",
        duracaoMedia: {
          $avg: {
            $subtract: ["$stopTime", "$startTime"],
          },
        },
      },
    },
    {
      $project: {
        tipo: "$_id",
        duracaoMedia: {
          $round: [{
            $divide: ["$duracaoMedia", 3.6e+6],
          }, 2],
        },
        _id: 0,
      },
    },
  ],
);

// 3.6e+6 = 3.6 x 106 = 3,600,000
