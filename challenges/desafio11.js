db.trips.aggregate([
  { $group:
    {
      _id: { $dayOfWeek: "$startTime" },
      totalTrips: { $sum: 1 },
    },
  },
  { $project:
    {
      diaDaSemana: "$_id",
      total: "$totalTrips",
      _id: 0,
    },
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
