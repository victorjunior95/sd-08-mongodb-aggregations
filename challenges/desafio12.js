db.trips.aggregate([
  {
    $lookup: {
      from: "trips",
      let: { dayOfWeek: "$dayOfWeek", startTime: "$startTime" },
      pipeline: [
        {
          $group: {
            _id: { $dayOfWeek: "$startTime" },
            total: { $sum: 1 },
          },
        },
        {
          $project: {
            diaDaSemana: "$_id",
          },
        },
        {
          $sort: { total: -1 },
        },
        { $limit: 1 },
      ],
      as: "diaDaSemana",
    },
  },
  {
    $project: {
      diaDaSemana: 1,
    },
  },
]);
