db.trips.aggregate([

  { $group:
    {
      _id: "$bikeid",
      tempoMedio: { $avg: { $subtract: ["$stopTime", "$startTime"] } },
    },

  },

  { $project: { duracaoMediaEmMinutos: { $ceil: { $divide: ["$tempoMedio", 60000] } } } },

  { $match: { duracaoMediaEmMinutos: 18 } },
  { $project: { duracaoMediaEmMinutos: 1, _id: 0 } },
  { $limit: 1 },

]);
