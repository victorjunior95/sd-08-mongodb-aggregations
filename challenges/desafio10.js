db.trips.aggregate([
  { $group: {
    _id: "$usertype",
    duracaoMedia: { $avg: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 36e5] } },
  } },
  { $set: { duracaoMedia: { $round: ["$duracaoMedia", 2] } } },
  { $project: { _id: 0, tipo: "$_id", duracaoMedia: "$duracaoMedia" } },
  { $sort: { duracaoMedia: 1 } },
]);
