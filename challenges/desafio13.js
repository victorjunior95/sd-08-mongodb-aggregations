db.trips.aggregate([
  {
    $match: {
      startTime: {
        $gte: ISODate("2016-03-10"),
        $lte: ISODate("2016-03-11"),
      },
    },
  },
  {
    $addFields: {
      duracaoTotal: {
        $divide: [
          { $subtract: ["$stopTime", "$startTime"] },
          60000,
        ],
      },
    },
  },
  {
    $group: {
      _id: null,
      duracaoMedia: {
        $avg: "$duracaoTotal",
      },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: {
        $round: ["$duracaoMedia"],
      },
    },
  },
]);
