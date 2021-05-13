db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      mediaViagens: { $avg: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 3600000] } },
    },
  },
  {
    $project: {
      _id: false,
      tipo: "$_id",
      duracaoMedia: { $round: ["$mediaViagens", 2] },
    },
  },
]);
