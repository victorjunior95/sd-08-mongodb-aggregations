db.trips.aggregate([
  { $match: { bikeid: { $exists: true } } },
  { $group: {
    _id: "$bikeid",
    duracaoMedia: {
      $avg: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000] },
    },
  } },
  { $sort: { duracaoMedia: -1 } },
  { $limit: 5 },
  { $project: {
    _id: 0,
    duracaoMedia: { $ceil: "$duracaoMedia" } } },
]);
