db.trips.aggregate([
  {
    $group: {
      _id: {
        $dayOfWeek: "$startTime",
      },
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
      diaDaSemana: "$_id",
      _id: 0,
      total: 1,
    },
  },
]);
