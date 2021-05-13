db.trips.aggregate([
  { $addFields: { duration: { $subtract: ["$stopTime", "$startTime"] } } },
  { $addFields: { percent: { $divide: ["$duration", 3600000] } } },
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: { $avg: "$percent" },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: ["$duracaoMedia", 2] },
    },
  },
  { $sort: { duracaoMedia: 1 } },
]);
