const milisegHoras = 60 * 60 * 1000;
const aggregation = [
  {
    $group: {
      _id: "$usertype",
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
      tipo: "$_id",
      duracaoMedia: { $round: [{ $divide: ["$duracaoMedia", milisegHoras] }, 2] },
    },
  },
  { $sort: { duracaoMedia: 1 } },
];
db.trips.aggregate(aggregation);
