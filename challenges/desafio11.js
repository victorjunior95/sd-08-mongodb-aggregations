db.trips.aggregate([
  { $group: {
    _id: { $dayOfWeek: "$startTime" },
    startTrips: { $sum: 1 },
  } },
  { $project: {
    _id: 0,
    diaDaSemana: "$_id",
    total: "$startTrips",
  } },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
