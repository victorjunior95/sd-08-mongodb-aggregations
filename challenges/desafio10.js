// The difference between stopTime and startTime was shown as milliseconds,
// then I divided like ( ms / 1000 / 60 / 60 ) = / 3600000 to display it as hours.

db.trips.aggregate(
  [{
    $addFields: {
      duracaoViagem: {
        $divide: [
          { $subtract: ["$stopTime", "$startTime"] },
          3600000,
        ],
      },
    },
  },
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: { $avg: "$duracaoViagem" },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: ["$duracaoMedia", 2] },
    },
  }],
);
