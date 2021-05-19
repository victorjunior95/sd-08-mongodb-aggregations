db.trips.aggregate([
  {
    $addFields: {
      dayWeek: {
        $dayOfWeek: "$startTime",
      },
    },
  },
  {
    $group: {
      _id: { dayWeek: "$dayWeek", stationName: "$startStationName" },
      total: { $sum: 1 },
    },
  },
  {
    $sort: {
      total: -1,
    },
  },
  {
    $limit: 1,
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id.stationName",
      total: "$total",
    },
  },
]);
