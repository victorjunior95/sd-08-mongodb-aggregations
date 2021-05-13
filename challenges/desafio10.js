// The difference between stopTime and startTime was shown as milliseconds,
// then I divided like ( ms / 1000 / 60 / 60 ) = / 3600000 to display it as hours.
const convertMillisecondsToHours = 3600000;
db.trips.aggregate(
  [{
    $addFields: {
      tripDuration: {
        $divide: [
          { $subtract: ["$stopTime", "$startTime"] },
          convertMillisecondsToHours,
        ],
      },
    },
  },
  {
    $group: {
      _id: "$usertype",
      averageDuration: { $avg: "$tripDuration" },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: ["$averageDuration", 2] },
    },
  }],
);
