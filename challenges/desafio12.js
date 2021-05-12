db.trips.aggregate([
  {
    $addFields: {
      dayOfWeek: { $dayOfWeek: "$startTime" },
    },
  },
  {
    $group: {
      _id: {
        dayOfWeek: "$dayOfWeek",
        stationName: "$startStationName",
      },
      total: { $sum: 1 },
    },
  },
  {
    $sort: { total: -1 },
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id.stationName",
      total: 1,
    },
  },
  {
    $limit: 1,
  },
]);
