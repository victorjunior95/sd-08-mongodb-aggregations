db.trips.aggregate(
  [
    {
      $match: {
        startTime: {
          $eq: ISODate("2016-03-10"),
        },
      },
    },
    {
      $group: {
        _id: null,
        duracaoMedia: {
          $avg: { $subtract: ["$stopTime", "$startTime"] },
        },
      },
    },
    {
      $project: {
        _id: 0,
        duracaoMediaEmMinutos: {
          $ceil: { $divide: ["$duracaoMedia", 60 * 1000] },
        },
      },
    },
  ],
);
