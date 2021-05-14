db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      _avg: {
        $avg: {
          $subtract: ["$stopTime", "$startTime"],
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: {
        $round: [
          {
            $divide: ["$_avg", 1000 * 60 * 60],
          },
          2,
        ],
      },
    },
  },
]);
