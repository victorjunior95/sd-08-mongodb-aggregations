db.trips.aggregate([
  {
    $addFields: {
      time: {
        $subtract: ["$stopTime", "$startTime"],
      },
    },
  },
  {
    $group: {
      _id: "$bikeid",
      duracaoMedia: {
        $avg: { $divide: ["$time", 60000] },
      },
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
  {
    $project: {
      _id: 0,
      bikeid: "$_id",
      duracaoMedia: {
        $ceil: "$duracaoMedia",
      },
    },
  },
]);
