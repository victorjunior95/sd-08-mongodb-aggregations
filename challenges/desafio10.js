db.trips.aggregate([
  {
    $addFields: {
      duracaoViagem: {
        $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 3600000],
      },
    },
  },
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: { $avg: "$duracaoViagem" },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: ["$duracaoMedia", 2] },
    },
  },
]);
