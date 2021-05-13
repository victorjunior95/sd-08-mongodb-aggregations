const UM_MINUTO = 60 * 1000;
db.trips.aggregate([
  {
    $group: {
      _id: "$bikeid",
      duracao: { $avg:
        { $subtract: ["$stopTime", "$startTime"] },
      },
    },
  },
  {
    $sort: { duracao: -1 },
  },
  {
    $limit: 5,
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: {
        $ceil: {
          $divide: ["$duracao", UM_MINUTO],
        },
      },
    },
  },
]);
