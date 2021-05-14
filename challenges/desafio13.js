db.trips.aggregate([
  {
    $match: {
      startTime: {
        $gte: ISODate("2016-03-10T00:00:00Z"),
        $lte: ISODate("2016-03-10T23:59:59Z"),
      },
    },
  },
  {
    $addFields: {
      time: { $subtract: ["$stopTime", "$startTime"] },
    },
  },
  {
    $group: {
      _id: null,
      duracaoMediaEmMinutos: { $avg: "$time" },
    },
  },
  {
    $project: {
      duracaoMediaEmMinutos: {
        $ceil: { $divide: ["$duracaoMediaEmMinutos", 60000] },
      },
      _id: 0,
    },
  },
]);
