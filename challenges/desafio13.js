db.trips.aggregate([
  {
    $addFields: {
      duracao: { $subtract: ["$stopTime", "$startTime"] },
      dia: { $dayOfMonth: "$startTime" },
      ano: { $year: "$startTime" },
      mes: { $month: "$startTime" },
    },
  },
  {
    $match: {
      mes: 3,
      dia: 10,
      ano: 2016,
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
      _id: 0,
      duracaoMediaEmMinutos: { $ceil: { $divide: ["$duracaoMedia", 1000 * 60] } },
    },
  },
]);
