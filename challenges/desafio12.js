db.trips.aggregate([
  {
    $addFields: {
      diaDaSemana: { $dayOfWeek: "$startTime" },
    },
  },
  {
    $lookup: {
      from: "trips",
      let: { diaDaSemana: "$diaDaSemana" },
      pipeline: [
        { $group: { _id: { $dayOfWeek: "$startTime" }, total: { $sum: 1 } } },
        { $project: { _id: 0, maxDiaDaSemana: "$_id", semanaTotal: "$total" } },
        { $sort: { semanaTotal: -1 } },
        { $limit: 1 },
        { $match: { $expr: { $eq: ["$maxDiaDaSemana", "$$diaDaSemana"] } } },
      ],
      as: "maxTrips",
    },
  },
  {
    $match: { maxTrips: { $size: 1 } },
  },
  {
    $group: {
      _id: "$startStationName", total: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id",
      total: "$total",
    },
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
