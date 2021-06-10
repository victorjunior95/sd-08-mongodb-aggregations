const STIPULATED_TIME = 60 * 1000;
db.trips.aggregate([
  {
    $group: {

      _id: "$bikeid",
      duracaoMedia: { $avg: { $subtract: ["$stopTime", "$startTime"] } },

    },
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia:
      { $ceil: { $divide:
        ["$duracaoMedia", STIPULATED_TIME] } },
    },
  },
  {
    $sort: { duracaoMedia: -1 },
  },
  {
    $limit: 5,
  },
]);
