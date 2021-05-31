db.trips.aggregate([
  {
    $group: {
      _id: "$bikeid",
      duracaoMedia: {
        $avg: {
          $subtract: ["$stopTime", "$startTime"],
        },
      },
    },
  },
  {
    $sort: { duracaoMedia: -1 },
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: {
        $ceil: {
          $divide: ["$duracaoMedia", 1000 * 60],
        },
      },
    },
  },
  {
    $limit: 5,
  },
]);
