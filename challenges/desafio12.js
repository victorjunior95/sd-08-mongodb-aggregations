db.trips.aggregate([
  {
    $addFields: {
      dayOfWeek: {
        $dayOfWeek: "$startTime",
      },
    },
  },
  {
    $lookup: {
      from: "trips",
      let: { id: "$_id" },
      pipeline: [
        {
          $addFields: {
            dayOfWeek: {
              $dayOfWeek: "$startTime",
            },
          },
        },
        {
          $group: {
            _id: "$dayOfWeek",
            total: {
              $sum: 1,
            },
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
            diaDaSemana: "$_id", _id: 0,
          },
        },
      ],
      as: "bestDayOfWeek",
    },
  },
  {
    $unwind: "$bestDayOfWeek",
  },
  {
    $match: {
      $expr: {
        $eq: ["$dayOfWeek", "$bestDayOfWeek.diaDaSemana"],
      },
    },
  },
  {
    $group: {
      _id: "$startStationName",
      total: {
        $sum: 1,
      },
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
      nomeEstacao: "$_id", total: "$total", _id: 0,
    },
  },
]);
