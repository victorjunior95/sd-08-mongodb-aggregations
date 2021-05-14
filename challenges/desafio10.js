db.trips.aggregate([
  {
    $addFields: { timeDifference: { $subtract: ["$stopTime", "$startTime"] } },
  },
  {
    $group: {
      _id: "$usertype",
      totalTrips: { $sum: 1 },
      totalTime: { $sum: "$timeDifference" },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: {
        $round: [
          { $divide: [{ $divide: ["$totalTime", "$totalTrips"] }, 3600000] },
          2,
        ],
      },
    },
  },
  { $sort: { duracaoMedia: 1 } },
]);
