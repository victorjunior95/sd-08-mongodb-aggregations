db.trips.aggregate([
  {
    $addFields: {
      variacaoTempo: {
        $subtract: ["$stopTime", "$startTime"],
      },
    },
  },
  {
    $group: {
      _id: "$usertype",
      media: {
        $avg: "$variacaoTempo",
      },
    },
  },
  {
    $project: {
      tipo: "$_id",
      duracaoMedia: {
        $round: [
          {
            $divide: ["$media", 3600000],
          },
          2,
        ],
      },
      _id: 0,
    },
  },
  {
    $sort: {
      duracaoMedia: 1,
    },
  },
]);
