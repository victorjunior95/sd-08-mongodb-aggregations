const ONE_MINUTE = 60000;

db.trips.aggregate([
  {
    $group: {
      _id: "$bikeid",
      duracao_media_milesimos: { $avg: {
        $subtract: ["$stopTime", "$startTime"] },
      },
    },
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: { $ceil:
        { $divide: ["$duracao_media_milesimos", ONE_MINUTE] },
      },
    },
  },
  {
    $sort: { duracaoMedia: -1 },
  },
  {
    $limit: 5,
  },
]);
