db.trips.aggregate([
  { $group: {
    _id: "$usertype",
    somaTempos: { $sum: { $subtract: ["$stopTime", "$startTime"] } },
    count: { $sum: 1 },
  } },
  { $project: {
    _id: 0,
    tipo: "$_id",
    duracaoMedia: { $round: [{ $divide: [{ $divide: ["$somaTempos", 3600000] }, "$count"] }, 2] },
  } },
]);
