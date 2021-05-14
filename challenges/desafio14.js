const convertMillisecondsToMinutes = 60000;
db.trips.aggregate(
  [{
    $addFields: {
      tripDuration: {
        $divide: [
          { $subtract: ["$stopTime", "$startTime"] },
          convertMillisecondsToMinutes,
        ],
      },
    },
  },
  {
    $group: {
      _id: "$bikeid",
      duracaoMedia: { $avg: "$tripDuration" },
    },
  },
  {
    $sort: { duracaoMedia: -1 },
  },
  {
    $limit: 5,
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: { $ceil: ["$duracaoMedia"] },
    },
  },
  ],
);
