const MINUTE = 60 * 1000;
db.trips.aggregate([
  { $group: {
    _id: "$bikeid",
    duracaoMedia:
    { $avg: {
      $divide: [{ $subtract: ["$stopTime", "$startTime"] }, MINUTE] },
    } } },
  { $project: {
    _id: 0,
    bikeId: "$_id",
    duracaoMedia: { $ceil: "$duracaoMedia" },
  } },
  { $sort: { duracaoMedia: -1 } },
  { $limit: 5 },
]);
