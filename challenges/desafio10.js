const umahora = 3600000;
db.trips.aggregate([
  { $group: { _id: "$usertype", media: { $avg: { $subtract: ["$stopTime", "$startTime"] } } } },
  { $project: {
    tipo: "_id",
    duracaoMedia: { $round: [{ $divide: ["$media", umahora] }, 2] },
    _id: 0 },
  },
]);
