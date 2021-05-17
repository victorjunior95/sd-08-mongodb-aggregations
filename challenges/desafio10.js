db.trips.aggregate([
  { $group: {
    _id: "$usertype",
    duracaoMedia: {
      $avg: { $divide: [{ $abs: { $subtract: ["$startTime", "$stopTime"] } },
        { $multiply: [3600000] }] } },
  } },
  { $project: {
    _id: 0,
    tipo: "$_id",
    duracaoMedia: { $round: ["$duracaoMedia", 2] },
  } },
  { $sort: { duracaoMedia: 1 } },
]);
