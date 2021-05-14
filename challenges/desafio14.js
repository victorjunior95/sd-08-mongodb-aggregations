db.trips.aggregate([
  {
    $addFields: {
      tempoTotalUmaViagem: { $subtract: ["$stopTime", "$startTime"] },
    },
  },
  {
    $group: {
      _id: "$bikeid",
      totalDeViagens: { $sum: 1 },
      tempoAcumuladoViagens: { $sum: "$tempoTotalUmaViagem" },
    },
  },
  {
    $project: {
      bikeId: "$_id",
      _id: 0,
      duracaoMedia: {
        $ceil: {
          $divide: [
            { $divide: ["$tempoAcumuladoViagens", "$totalDeViagens"] },
            60000,
          ],
        },
      },
    },
  },
  { $sort: { duracaoMedia: -1 } },
  { $limit: 5 },
]);
