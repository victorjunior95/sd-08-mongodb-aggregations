db.trips.aggregate([
  { $addFields:
    {
      duration: {
        $divide: [
          { $subtract: ["$stopTime", "$startTime"] }, 3600000,
        ],
      },
    },
  },
  { $group:
    {
      _id: "$usertype",
      duracaoMedia: { $avg: "$duration" },
    },
  },
  { $project:
    {
      tipo: "$_id",
      duracaoMedia: { $round: ["$duracaoMedia", 2] },
      _id: 0,
    },
  },
]);
