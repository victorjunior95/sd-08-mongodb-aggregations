db.trips.aggregate([
  {
    $group:
    {
      _id:
      {
        dia_semana: { $dayOfWeek: "$startTime" },
        estacao: "$startStationName",
      },
      startTrips: { $sum: 1 },
    },
  },
  {
    $project:
    {
      _id: 0,
      nomeEstacao: "$_id.estacao",
      total: "$startTrips",
    },
  },
  {
    $sort: { total: -1 },
  },
  { $limit: 1 },
]);
