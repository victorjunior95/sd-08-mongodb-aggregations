db.trips.aggregate([
  { $addFields: { duracaoViagem: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000] } } },
  { $group: {
    _id: "$bikeid",
    media: { $avg: "$duracaoViagem" },
  } },
  { $sort: { media: -1 } },
  { $project: { _id: 0, bikeId: "$_id", duracaoMedia: { $ceil: "$media" } } },
  { $limit: 5 },
]);
