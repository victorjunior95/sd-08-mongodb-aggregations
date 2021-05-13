db.trips.aggregate([
  { $group: { _id: "$usertype", duracaoMedia: { $avg: { $subtract: ["$stopTime", "$startTime"] } } } },
  { $project: { tipo: "$_id", duracaoMedia: { $round: [{ $divide: ["$duracaoMedia", 36000000] }, 2] } } },
]);
