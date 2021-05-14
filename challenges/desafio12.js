db.trips.aggregate([
  {
    $addFields: {
      dayWeek: { $dayOfWeek: "$startTime" },
    },
  },
  {
    $group: {
      _id: "$dayWeek",
      total: { $sum: 1 },
    },
  },
  {
    $sort: {
      total: -1,
    },
  },
  {
    $limit: 1,
  },
  {
    $project: {
      _id: 0,
      diaDaSemana: "$_id",
      total: "$total",
    },
  },
  {
    $lookup: {
      from: "trips",
      let: { isDay: "$diaDaSemana" },
      pipeline: [
        {
          $addFields: {
            inDay: { $dayOfWeek: "$startTime" },
          },
        },
        {
          $match: {
            $expr: { $eq: ["$inDay", "$$isDay"] },
          },
        },
        {
          $group: {
            _id: "$startStationName",
            totalDias: { $sum: 1 },
            day: { $first: "$inDay" },
          },
        },
        {
          $sort: { totalDias: -1 },
        },
        {
          $limit: 1,
        },
      ],
      as: "dataStation",
    },
  },
  { $unwind: "$dataStation" },
  {
    $project: {
      nomeEstacao: "$dataStation._id",
      total: "$dataStation.totalDias",
    },
  },
]);
