db.trips.aggregate([
  { $match: {
    startTime: { $gte: ISODate("2016-03-10") },
  } },
  { $group: {
    _id: null,
    duracaoMedia: { $avg: { $sum: { $abs: { $subtract: ["$stopTime", "$startTime"] } } } },
  } },
  { $project: {
    _id: 0,
    duracaoMediaEmMinutos: { $ceil: { $divide: ["$duracaoMedia", 60000] } },
  } },
]);
