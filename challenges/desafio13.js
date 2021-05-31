db.trips.aggregate([
  {
    $match: {
      $expr: {
        $and: [
          { $gte: ["$startTime", ISODate("2016-03-10T00:00:00Z")] },
          { $lte: ["$startTime", ISODate("2016-03-10T23:59:59Z")] },
        ],
      },
    },
  },
  {
    $group: {
      _id: null,
      duracaoMediaEmMinutos: {
        $avg: {
          $subtract: ["$stopTime", "$startTime"],
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: {
        $ceil: { $divide: ["$duracaoMediaEmMinutos", 1000 * 60] },
      },
    },
  },
]);
