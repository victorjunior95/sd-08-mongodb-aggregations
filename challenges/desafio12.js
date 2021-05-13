db.trips.aggregate([
  {
    $addFields: {
      startDayOfWeek: {
        $dayOfWeek: "$startTime",
      },
    },
  },
  {
    $match: {
      startDayOfWeek: 5,
    },
  },
  {
    $group: {
      _id: {
        day: "$startDayOfWeek",
        name: "$startStationName",
      },
      total: {
        $sum: 1,
      },
    },
  },
  {
    $project: {
      nomeEstacao: "$_id.name",
      total: 1,
      _id: 0,
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
]);
