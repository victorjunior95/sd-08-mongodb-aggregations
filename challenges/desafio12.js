db.trips.aggregate([
  { $group:
    {
      _id: { $dayOfWeek: "$startTime" },
      season: "$startStationName",
      totalTrips: { $sum: 1 },
    },
  },
  { $project:
    {
      nomeEstacao: "$season",
      total: "$totalTrips",
      _id: 0,
    },
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
