db.trips.aggregate([
  {
    $addFields: {
      diaDaSemana: {
        $dayOfWeek: "$startTime",
      },
    },
  },
  {
    $group: {
      _id: "$diaDaSemana",
      total: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      diaDaSemana: "$_id",
      total: "$total",
    },
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
  {
    $lookup: {
      from: "trips",
      let: { weekday: "$diaDaSemana" },
      pipeline: [
        {
          $addFields: {
            diaDaSemana: {
              $dayOfWeek: "$startTime",
            },
          },
        },
        {
          $match: {
            $expr: { $eq: ["$diaDaSemana", "$$weekday"] },
          },
        },
        {
          $group: {
            _id: "$startStationName",
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
      ],
      as: "matchingStations",
    },
  },
  {
    $project: {
      nomeEstacao: { $first: "$matchingStations._id" },
      total: { $first: "$matchingStations.count" },
    },
  },
]);