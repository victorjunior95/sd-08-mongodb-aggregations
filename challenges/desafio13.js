db.trips.aggregate([
  {
    $match: { startTime: { $gte: ISODate("2016-03-10T00:00:01Z"), $lte: ISODate("2016-03-10T23:59:59Z") } },
  },
  {
    $addFields: {
      duracaoViagem: {
        $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000],
      },
    },
  },
  {
    $group: {
      _id: null,
      duracaoMediaEmMinutos: { $avg: "$duracaoViagem" },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $ceil: "$duracaoMediaEmMinutos" },
    },
  },
]);
