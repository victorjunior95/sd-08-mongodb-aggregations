db.trips.aggregate([
  {
    $lookup: {
      from: "trips",
      let: { diaDaSemana: { $dayOfWeek: "$startTime" } },
      pipeline: [
        {
          $group: {
            _id: { $dayOfWeek: "$startTime" },
            total: { $sum: 1 },
          },
        },
        {
          $sort: { total: -1 },
        },
        {
          $limit: 1,
        },
        {
          $project: {
            _id: 0,
            diaDaSemana: "$_id",
            total: 1,
            dia2: "$$diaDaSemana",
          },
        },
      ],
      as: "lalala",
    },
  },
  {
    $match: {
      $expr: {
        $eq: ["$lalala.diaDaSemana", "$lalala.dia2"],
      },
    },
  },
  {
    $group: {
      _id: "$startStationName",
      total: { $sum: 1 },
    },
  },
  {
    $sort: { total: -1 },
  },
  {
    $limit: 1,
  },
]);
