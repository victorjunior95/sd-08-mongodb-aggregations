db.trips.aggregate([
  {
    $addFields: {
      // https://docs.mongodb.com/manual/reference/operator/aggregation/dayOfWeek
      startDayOfWeek: { $dayOfWeek: "$startTime" },
    },
  },
  {
    $group: {
      _id: "$startDayOfWeek",
      total: { $sum: 1 },
    },
  },
  {
    $sort: {
      total: -1,
    },
  },
  {
    $project: {
      _id: 0,
      diaDaSemana: "$_id",
      total: 1,
    },
  },
  {
    $limit: 1,
  },
]);
