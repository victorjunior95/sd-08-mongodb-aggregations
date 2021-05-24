db.trips.aggregate(
  [
    {
      $addFields: {
        duracao: { $subtract: ["$stopTime", "$startTime"] },
      },
    },
    {
      $project: {
        _id: 0,
        usertype: 1,
        duracao_horas: { $divide: ["$duracao", 3600000] },
      },
    },
    {
      $group: {
        _id: "$usertype",
        duracaoMedia: { $avg: "$duracao_horas" },
      },
    },
    {
      $project: {
        _id: 0,
        tipo: "$_id",
        duracaoMedia: { $round: ["$duracaoMedia", 2] },
      },
    },
    {
      $sort: { duracaoMedia: 1 },
    },
  ],
);
