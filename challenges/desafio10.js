db.trips.aggregate(
  [
    {
      $addFields: {
        total: {
          $divide: [
            { $subtract: ["$stopTime", "$startTime"] },
            3600000,
          ],
        },
      },
    },
    {
      $group: {
        _id: "$usertype",
        media: {
          $avg: "$total",
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
    },
    {
      $sort: {
        duracaoMedia: 1,
      },
    },
  ],
);
