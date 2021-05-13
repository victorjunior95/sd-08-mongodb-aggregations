db.trips.aggregate([
  {
    $addFields: {
      diaDaSemana: { $dayOfWeek: "$startTime" },
      duracao: { $subtract: ["$stopTime", "$startTime"] },
    },
  },
  {
    $match: {
      diaDaSemana: 5,
    },
  },
  {
    $group: {
      _id: null,
      duracaoMedia: { $avg: "$duracao" },
    },
  },
  {
    $project: {
      duracaoMediaEmMinutos: { $divide: ["$duracaoMedia", 1000 * 60] },
    },
  },
  {
    $project: {
      duracaoMediaEmMinutos: { $ceil: "$duracaoMediaEmMinutos" },
      _id: 0,
    },
  },
]);
