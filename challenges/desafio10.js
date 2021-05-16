const MS = 3600000;
db.trips.aggregate([{
  $group: {
    _id: "$usertype",
    avgTime: {
      $avg: { $divide: [
        { $subtract: ["$stopTime", "$startTime"] }, MS,
      ] },
    },
  },
}, { $project: {
  _id: 0,
  tipo: "$_id",
  duracaoMedia: { $round: ["$avgTime", 2] } },
}]);
