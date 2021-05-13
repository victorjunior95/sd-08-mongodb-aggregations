db.trips.aggregate([
  { $addFields: {
    time: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000] },
  /* source: https://stackoverflow.com/questions/41138877/how-to-calculate-timestamp-difference-in-mongodb-in-hours */
  } },
  { $group: {
    _id: "$bikeid",
    totalTime: { $avg: "$time" },
  } },
  { $project: {
    bikeId: "$_id",
    duracaoMedia: { $ceil: "$totalTime" },
    _id: 0,
  } },
  { $sort: { duracaoMedia: -1 } },
  { $limit: 5 },
]);
