db.trips.aggregate([

  { $group: { _id: { $dayOfWeek: "$startTime" }, diaDaSemana: { $avg: { $dayOfWeek: "$startTime" } }, total: { $sum: 1 } } },
  { $project: { diaDaSemana: 1, total: 1, _id: 0 } },
  { $sort: { total: -1 } },
  { $limit: 1 },

]);
