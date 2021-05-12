db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: {
        $avg: { $divide: [
          { $subtract: ["$stopTime", "$startTime"] },
          36000,
        ] },
      },
    },
  },
  { $sort: { duracaoMedia: 1 } },
  { $project: { _id: "$_id", duracaoMedia: { $round: ["$duracaoMedia", 2] } } },
]);
