db.trips.aggregate([
  {
    $addFields: {
      duration: {
        $divide: [
          { $subtract: ["$stopTime", "$startTime"] },
          60 * 1000,
        ],
      },
    },
  },
  {
    $group: {
      _id: "$bikeid",
      media_duration: { $avg: "$duration" },
    },
  },
  {
    $sort: {
      media_duration: -1,
    },
  },
  {
    $limit: 5,
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: { $ceil: "$media_duration" },
    },
  },
]);
