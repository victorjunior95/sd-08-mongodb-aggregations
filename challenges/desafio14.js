db.trips.aggregate([
  {
    $group: {
      _id: "$bikeid",
      mediaViagens: { $avg: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60 * 1000] } },
    },
  },
  {
    $project: {
      _id: false,
      bikeId: "$_id",
      duracaoMedia: { $ceil: "$mediaViagens" },
    },
  },
  {
    $sort: {
      duracaoMedia: -1,
    },
  },
  {
    $limit: 5,
  },
]);
