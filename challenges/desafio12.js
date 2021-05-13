db.trips.aggregate([
  { $addFields: {
    dayOfWeek: { $dayOfWeek: "$startTime" },
  } },
  { $match: { dayOfWeek: 5 } },
  { $group: {
    _id: "$startStationName",
    totalViagens: { $sum: 1 },
  } },
  { $project: {
    nomeEstacao: "$_id",
    total: "$totalViagens",
    _id: 0,
  } },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
