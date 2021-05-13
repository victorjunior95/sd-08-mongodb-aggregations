db.trips.aggregate([{ $match: { startTime: { $gt: ISODate("2016-03-09"), $lt: ISODate("2016-03-11") } } }, { $group: {
  _id: null,
  duracaoMedia: { $avg: { $subtract: ["$stopTime", "$startTime"] } },
},
}, { $project: {
  _id: 0,
  duracaoMediaEmMinutos: { $ceil: { $divide: ["$duracaoMedia", 60 * 1000] } },
},
}]);
