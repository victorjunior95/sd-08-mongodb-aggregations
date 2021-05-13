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
      media: {
        $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60 * 1000],
      },
    },
  },
  {
    $group: { _id: null, duracaoMediaEmMinutos: { $avg: "$media" } },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $round: "$duracaoMediaEmMinutos" },
    },
  },
]);
