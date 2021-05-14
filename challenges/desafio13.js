db.trips.aggregate([{ $match: { tartTime: { $gte: ISODate("2016-03-10"), $lte: ISODate("2016-03-11") } } },
  { $group: { _id: null, duracaoMediaEmMinutos: { $avg: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000] } } } },
  { $project: { _id: 0, duracaoMediaEmMinutos: { $ceil: "$duracaoMediaEmMinutos" } } },
]);
