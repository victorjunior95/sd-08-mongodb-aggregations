db.trips.aggregate([
  {
    $match: {
      startTime: {
        $gte: ISODate("2016-03-10T00:00:00.000Z"),
        $lte: ISODate("2016-03-10T23:59:59.999Z"),
      },
    },
  },
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
      _id: null,
      media_duration: { $avg: "$duration" },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $ceil: "$media_duration" },
    },
  },
]);
