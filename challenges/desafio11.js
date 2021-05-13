db.trips.aggregate([
  {
    $addFields: {
      diaDaSemana: { $dayOfWeek: "$startTime" },
    },
  },
  {
    $group: {
      _id: "$diaDaSemana",
      soma: { $sum: 1 },
    },
  },
  {
    $sort: {
      soma: -1,
    },
  },
  {
    $limit: 1,
  },
  {
    $project: {
      _id: false,
      diaDaSemana: "$_id",
      total: "$soma",
    },
  },
]);
