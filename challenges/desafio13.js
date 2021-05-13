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
    $group: {
      _id: null,
      duracaoMediaEmMinutos: {
        $avg: {
          $divide: [
            { $subtract: [
              { $minute: "$stopTime" }, { $minute: "$startTime" },
            ],
            }, 0.0166, // -> 1 minuto dividido por 60s
          ],
        },
      },
    },
  },
  { $project: {
    _id: 0,
    duracaoMediaEmMinutos: { $ceil: "$duracaoMediaEmMinutos" },
  },
  },
]);
