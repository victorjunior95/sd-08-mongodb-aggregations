db.trips.aggregate([
  {
    $addFields: {
      tripDuration: {
        $divide: [{ $subtract: ["$stopTime", "$startTime"] }, (60 * 60 * 1000)],
      },
    },
  },
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: { $avg: "$tripDuration" },
    },
  },
  {
    $sort: {
      duracaoMedia: 1,
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
