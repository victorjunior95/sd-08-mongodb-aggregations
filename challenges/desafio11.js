db.trips.aggregate([
  { $addFields: {
    dayOfWeek: { $dayOfWeek: "$startTime" },
  } },
  { $group: {
    _id: "$dayOfWeek",
    totalViagens: { $sum: 1 },
  } },
  { $project: {
    diaDaSemana: "$_id",
    total: "$totalViagens",
    _id: 0,
  } },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
