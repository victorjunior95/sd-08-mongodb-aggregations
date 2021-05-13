db.trips.aggregate([
  { $addFields: {
    time: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 3600000] },
  } },
  { $group: {
    _id: "$usertype",
    Media: { $avg: "$time" },
  } },
  { $project: {
    tipo: "$_id",
    duracaoMedia: { $round: ["$Media", 2] },
    _id: 0,
  } },
]);
/* source: https://stackoverflow.com/questions/41138877/how-to-calculate-timestamp-difference-in-mongodb-in-hours */
