const HORAS = 1000 * 60 * 60;
db.trips.aggregate(
  {
    $addFields: {
      duracao: {
        $divide: [
          { $subtract: ["$stopTime", "$startTime"] },
          HORAS,
        ],
      },
    },
  },
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: { $avg: "$duracao" },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: ["$duracaoMedia", 2] },
    },
  },
);
