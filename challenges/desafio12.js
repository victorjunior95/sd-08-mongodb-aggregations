db.trips.aggregate([
  {
    $addFields: { daysOfWeek: { $dayOfWeek: "$startTime" } },
  },
  {
    $match: {
      daysOfWeek: 5,
    },
  },
  {
    $group: {
      _id: "$startStationName",
      total: { $sum: 1 },
    },
  },
  {
    $sort: { total: -1 },
  },
  {
    $limit: 1,
  },
  {
    $project: {
      _id: 0,
      nomeDaEstacao: "$_id",
      total: "$total",
    },
  },
]);
