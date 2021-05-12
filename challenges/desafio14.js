db.trips.aggregate([
  { $group: {
    _id: "$bikeid",
    duracaoMediaEmMinutos: { $avg: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 6e4] } },
  } },
  { $project: {
    _id: 0,
    bikeId: "$_id",
    duracaoMediaEmMinutos: { $ceil: "$duracaoMediaEmMinutos" },
  } },
  { $sort: { duracaoMediaEmMinutos: -1 } },
  { $limit: 5 },
]);
