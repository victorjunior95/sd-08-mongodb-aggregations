db.trips.aggregate([
  {
    $match: {
      startTime: {
        $gte: ISODate("2016-03-10T00:00:00.000Z"),
        $lte: ISODate("2016-03-10T23:59:59.000Z"),
      },
    },
  },
  {
    $addFields: {
      tempoTotalUmaViagem: { $subtract: ["$stopTime", "$startTime"] },
    },
  },
  {
    $group: {
      _id: null,
      totalDeViagens: { $sum: 1 },
      tempoAcumuladoViagens: { $sum: "$tempoTotalUmaViagem" },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: {
        $ceil: {
          $divide: [
            { $divide: ["$tempoAcumuladoViagens", "$totalDeViagens"] },
            60000,
          ],
        },
      },
    },
  },
]);
