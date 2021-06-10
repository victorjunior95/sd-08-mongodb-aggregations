db.trips.aggregate([{ $group: { _id: { $dayOfWeek: "$startTime" }, dia: { $sum: 1 } } },
  { $project: { _id: 0, diaDaSemana: "$_id", total: "$dia" } },
  { $sort: { total: -1 } }, { $limit: 1 },
]);
