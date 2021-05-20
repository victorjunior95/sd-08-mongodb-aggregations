db.trips.aggregate([
  {
    $addFields: {
      variacao: {
        $subtract: ["$stopTime", "$startTime"],
      },
    },
  },
  {
    $group: {
      _id: "$bikeid",
      media: {
        $avg: "$variacao",
      },
    },
  },
  {
    $project: {
      bikeId: "$_id",
      duracaoMedia: {
        $ceil: {
          $divide: ["$media", 1000 * 60],
        },
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
]);
