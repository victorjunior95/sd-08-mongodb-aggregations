db.trips.aggregate([
  {
    $addFields: {
      // https://docs.mongodb.com/manual/reference/operator/aggregation/dateToString/
      startDate: { $dateToString: {
        date: "$startTime",
        format: "%d/%m/%Y",
      } },
    },
  },
  {
    $match: {
      startDate: "10/03/2016",
    },
  },
  {
    $group: {
      _id: "$startDate",
      duracaoMediaEmMilisegundos: { $avg: { $subtract: ["$stopTime", "$startTime"] } },
    },
  },
  {
    $project: {
      duracaoMediaEmMinutos: {
        $ceil: {
          $divide: ["$duracaoMediaEmMilisegundos", 60 * 1000],
        },
      },
    },
  },
]);
