// Encontre a média de viagens por tipo de usuário
//   A) Arredondar o valor em horas com duas casas decimais ($round)
//   B) Ordenar a média de viagens de forma crescente

db.trips.aggregate([
  {
    $addFields: {
      duration: {
        $subtract: [
          "$stopTime",
          "$startTime",
        ],
      },
    },
  },
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: { $avg: "$duration" },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: [{ $divide: ["$duracaoMedia", 60 * 60 * 1000] }, 2] },
    },
  },
  { $sort: { duracaoMedia: 1 } },
]);
