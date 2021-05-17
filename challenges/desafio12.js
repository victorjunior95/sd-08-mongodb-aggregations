db.trips.aggregate([
  { $group: { _id: { dia: { $dayOfWeek: "$startTime" },
    esta: { inicio: "$startStationName" } },
  tot: { $sum: 1 } } },

  { $sort: { tot: -1 } },

  { $limit: 1 },

  { $project: { nomeEstacao: "$_id.esta.inicio", total: "$tot", _id: 0 } },

]);
