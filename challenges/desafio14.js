db.trips.aggregate([
  { $group: {
    _id: "$bikeid",
    mediaMilissegundos: { $avg: { $subtract: ["$stopTime", "$startTime"] } },
  } },
  { $project: {
    _id: 0,
    bikeId: "$_id",
    duracaoMedia: {
      $ceil: {
        $divide: ["$mediaMilissegundos", 60000] } } } },
  { $sort: { duracaoMedia: -1 } },
  { $limit: 5 },
]);
