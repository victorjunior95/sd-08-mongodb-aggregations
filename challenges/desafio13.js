db.trips.aggregate([
  {
    $addFields: {
      dia: {
        $dayOfMonth: "$startTime",
      },
      mes: {
        $month: "$startTime",
      },
      ano: {
        $year: "$startTime",
      },
      variacao: {
        $subtract: ["$stopTime", "$startTime"],
      },
    },
  },
  {
    $match: {
      dia: {
        $eq: 10,
      },
      mes: {
        $eq: 3,
      },
      ano: {
        $eq: 2016,
      },
    },
  },
  {
    $group: {
      _id: null,
      media: {
        $avg: "$variacao",
      },
    },
  },
  {
    $project: {
      duracaoMediaEmMinutos: {
        $ceil: {
          $divide: ["$media", 1000 * 60],
        },
      },
      _id: 0,
    },
  },
]);
