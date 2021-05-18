db.trips.aggregate([
  {
    $match: {
      $expr: {
        $and: [
          { $eq: [{ $year: "$startTime" }, 2016] },
          { $eq: [{ $month: "$startTime" }, 3] },
          { $eq: [{ $dayOfMonth: "$startTime" }, 10] },
        ],
      },
    },
  },
  {
    $addFields: {
      time: {
        $subtract: ["$stopTime", "$startTime"],
      },
    },
  },
  {
    $group: {
      _id: null,
      duracaoMedia: {
        $avg: { $divide: ["$time", 60000] },
      },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: {
        $ceil: "$duracaoMedia",
      },
    },
  },
]);
