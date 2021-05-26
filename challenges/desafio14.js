db.trips.aggregate([
  { $addFields: {
    time: { $subtract: ["$stopTime", "$startTime"] },
  },
  },
  { $group:
      { _id: "$bikeid",
        avg:
        { $avg:
          { $divide:
            ["$time", 60000],
          },
        },
      },
  },
  { $project:
      {
        _id: 0,
        bikeId: "$_id",
        duracaoMedia: { $ceil: "$avg" },
      },
  },
  { $sort: { duracaoMedia: -1 } },
  { $limit: 5 },
]);
