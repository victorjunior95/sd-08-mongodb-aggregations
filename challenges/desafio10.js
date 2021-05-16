const HOUR = 60 * 60 * 1000;
db.trips.aggregate([
  { $group: {
    _id: "$usertype",
    duracaoMedia:
    { $avg: {
      $divide: [{ $subtract: ["$stopTime", "$startTime"]}, HOUR ] },
    } } },
  { $project: {
    _id: 0,
    tipo: "$_id",
    duracaoMedia: { $round: ["$duracaoMedia", 2] },
  } },
]);
