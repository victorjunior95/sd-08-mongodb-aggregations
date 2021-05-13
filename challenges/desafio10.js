db.trips.aggregate([
  {
    $addFields: {
      diff: { $subtract: ["$stopTime", "$startTime"] },
    },
  },
  {
    $addFields: {
      result: {
        $divide: ["$diff", 3600000],
      },
    },
  },
  {
    $group: {
      _id: "$usertype",
      media: {
        $avg: "$result",
      },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: {
        $round: ["$media", 2],
      },
    },
  }, { $sort: { duracaoMedia: 1 } },
]);
