db.trips.aggregate([{
  $match: {
    startTime: {
      $gte: ISODate("2016-03-10"),
      $lte: ISODate("2016-03-10 23:59:59"),
    },
  },
}, {
  $group: {
    _id: null,
    duracaoMediaEmMinutos: {
      $avg: {
        $subtract: ["$stopTime", "$startTime"],
      },
    },
  },
}, {
  $project: {
    _id: 0,
    duracaoMediaEmMinutos: {
      $ceil: {
        $divide: ["$duracaoMediaEmMinutos", 60000],
      },
    },
  },
}]);
