db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      mediaMilissegundos: { $avg: { $subtract: ["$stopTime", "$startTime"] } },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      // 1 hora = 3600000 milissegundos
      duracaoMedia: {
        $round: [{
          $divide: ["$mediaMilissegundos", 3600000],
        }, 2],
      },
    },
  },
  // { $count: "myCount" }
]);
