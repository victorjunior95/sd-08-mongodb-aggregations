db.trips.aggregate(
  [
    {
      $addFields: {
        total: {
          $divide: [
            { $subtract: ["$stopTime", "$startTime"] },
            60000,
          ],
        },
      },
    },
    {
      $match: {
        startTime: {
          $gte: ISODate("2016-03-10"),
        },
      },
    },
    {
      $group: {
        _id: null,
        media: {
          $avg: "$total",
        },
      },
    },
    {
      $project: {
        _id: 0,
        duracaoMediaEmMinutos: {
          $round: ["$media"],
        },
      },
    },
  ],
);
