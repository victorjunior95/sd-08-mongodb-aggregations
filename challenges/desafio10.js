const converteHoras = 1000 * 60 * 60;
db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      mediaViagens: { $avg: { $subtract: ["$stopTime", "$startTime"] } },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: [{ $divide: ["$mediaViagens", converteHoras] }, 2] },
    },
  },
  {
    $sort: { duracaoMedia: 1 },
  },
]);
