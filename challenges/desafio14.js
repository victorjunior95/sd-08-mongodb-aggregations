db.trips.aggregate([
  {
    $addFields: {
      totalTime: { $subtract: ["$stopTime", "$startTime"] },
    },
  },
  {
    $group: {
      _id: "$bikeid",
      duracaoMediaEmMinutos: { $avg: "$totalTime" },
      quantidadeBikes: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: {
        $ceil: { $divide: ["$duracaoMediaEmMinutos", 1000 * 60] },
      },
    },
  },
  {
    $sort: {
      duracaoMedia: -1,
      quantidadeBikes: -1,
    },
  },
  { $limit: 5 },
]);
