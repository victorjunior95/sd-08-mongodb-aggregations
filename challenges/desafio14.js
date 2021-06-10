// Baseado na duração média das viagens, determine quais são as 5 bicicletas
//   que foram mais utilizadas
// Obs. Exibir o resultado em minutos arredondados para cima e em ordem decrescente

db.trips.aggregate([
  {
    $group: {
      _id: "$bikeid",
      duracaoMedia: {
        $avg: {
          $divide: [
            { $subtract: ["$stopTime", "$startTime"] },
            60 * 1000,
          ],
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: { $ceil: "$duracaoMedia" },
    },
  },
  { $sort: { duracaoMedia: -1 } },
  { $limit: 5 },
]);
