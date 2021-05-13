db.trips.aggregate([
  {
    $addFields: {
      day: { $dayOfWeek: "$startTime" },
    },
  },
  {
    $match: { day: 5 },
  },
  { $group: {
    _id: "$day",
    total: { $sum: 1 },
  },
  },
  { $sort: { total: -1 },
  },
  { $limit: 1,
  },
  { $project: {
    diaDaSemana: "$_id",
    total: "$total",
    _id: 0,
  },
  },
]);
