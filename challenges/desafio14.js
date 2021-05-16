const milisegMinutos = 60 * 1000;
const aggregation = [
  {
    $group: {
      _id: "$bikeid",
      count: { $sum: 1 },
      duracaoMedia:
            {
              $avg:
                {
                  $subtract: ["$stopTime", "$startTime"],
                },
            },
    },
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: { $ceil: { $divide: ["$duracaoMedia", milisegMinutos] } },
    },
  },
  { $sort: { duracaoMedia: -1 } },
  { $limit: 5 },
];
db.trips.aggregate(aggregation);
