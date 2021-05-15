db.trips.aggregate([{
  $group: {
    _id: "$usertype",
    avgTime: {
      $avg: { $divide: [
        { $subtract: ["$stopTime", "$startTime"] }, 1000 * 60 * 60,
      ] },
    },
  },
}, { $project: {
  _id: 0,
  tipo: "$_id",
  duracaoMedia: { $round: ["$avgTime", 2] } },
}]);
