db.trips.aggregate([
  {
    $match: {
      startTime: {
        $gt: ISODate("2016-03-10"),
        $lt: ISODate("2016-03-11"),
      },
    },
  },
  {
    $addFields: {
      duracaoEmMilisegundos: {
        $subtract: ["$stopTime", "$startTime"],
      },
    },
  },
  {
    $group: {
      _id: null,
      duracaoMedia: {
        $avg: {
          $divide: ["$duracaoEmMilisegundos", 60000],
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $ceil: "$duracaoMedia" },
    },
  },
]);
