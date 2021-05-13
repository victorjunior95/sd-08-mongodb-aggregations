db.trips.aggregate([
  {
    $project: {
      diaDaSemana: {
        $dayOfWeek: "$startTime",
      },
    },
  },
  {
    $group: {

      _id: "$diaDaSemana",
      totalA: { $sum: 1 },

    },
  },
  {
    $project: {
      _id: 0,
      diaDaSemana: "$_id",
      total: "$totalA",
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
