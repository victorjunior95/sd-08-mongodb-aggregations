const aggregation = [
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      diaDaSemana: { $dayOfWeek: "$startTime" },
    },
  },
  {
    $group: {
      _id: "$diaDaSemana",
      total: { $sum: 1 },
    },
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
  {
    $project: {
      _id: 0,
      diaDaSemana: "$_id",
      total: 1,
    } },
];
db.trips.aggregate(aggregation);
