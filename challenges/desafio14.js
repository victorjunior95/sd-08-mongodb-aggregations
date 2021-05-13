db.trips.aggregate([
  {
    $addFields: {
      duracao: { $subtract: ["$stopTime", "$startTime"] },
    },
  },
  {
    $group: {
      _id: "$bikeid",
      media: { $avg: "$duracao" },
    },
  },
  {
    $sort: { media: -1 },
  },
  {
    $limit: 5,
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: { $ceil: { $divide: ["$media", 1000 * 60] } },
    },
  },
]);
