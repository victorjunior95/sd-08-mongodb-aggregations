db.trips.aggregate([
  {
    $match: {
      startTime: {
        $gte: new Date("2016-03-10"),
        $lt: new Date("2016-03-11"),
      },
    },
  },
  {
    $group: {
      _id: null,
      minutesDuration: {
        $avg: {
          $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000],
        },
      },
    },
  },
  {
    $project: {
      _id: false,
      duracaoMediaEmMinutos: {
        $ceil: "$minutesDuration",
      },
    },
  },
]);
