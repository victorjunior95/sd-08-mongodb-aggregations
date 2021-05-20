db.trips.aggregate([
  {
    $addFields: {
      dayWeekStart: {
        $dayOfWeek: "$startTime",
      },
    },
  },
  {
    $match: {
      dayWeekStart: {
        $eq: 5,
      },
    },
  },
  {
    $group: {
      _id: "$startStationName",
      count: {
        $sum: 1,
      },
    },
  },
  {
    $sort: {
      count: -1,
    },
  },
  {
    $project: {
      nomeEstacao: "$_id",
      total: "$count",
      _id: 0,
    },
  },
  {
    $limit: 1,
  },
]);
