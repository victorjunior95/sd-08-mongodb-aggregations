const ONE_HOUR = 3600000;
db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      average_thousandth: { $avg: {
        $subtract: ["$stopTime", "$startTime"] },
      },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: {
        $round: [{
          $divide: ["$average_thousandth", ONE_HOUR],
        }, 2],
      },
    },
  },
]);
