const MINUTE = 60 * 1000;
db.trips.aggregate([
  { $match: { startTime: { $gte: ISODate("2016-03-10"), $lte: ISODate("2016-03-11") } } },
  { $group: {
    _id: null,
    duracaoMediaEmMinutos:
    { $avg: {
      $divide: [{ $subtract: ["$stopTime", "$startTime"] }, MINUTE] },
    } } },
  { $project: {
    _id: 0,
    duracaoMediaEmMinutos: { $ceil: "$duracaoMediaEmMinutos" },
  } },
]);
