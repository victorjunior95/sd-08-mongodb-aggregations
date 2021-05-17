db.trips.aggregate([

  {
    $group:
      {
        _id: "$bikeid",
        tempoMedio: { $avg: { $subtract: ["$stopTime", "$startTime"] } },
      },

  },

  { $project: { duracaoMedia: { $ceil: { $divide: ["$tempoMedio", 60000] } }, bikeId: "$_id", _id: 0 } },
  { $sort: { duracaoMedia: -1 } },
  { $limit: 5 },
]);
