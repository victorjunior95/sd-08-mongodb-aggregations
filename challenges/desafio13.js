// Solution to find dates found at:
// https://stackoverflow.com/questions/25395760/find-data-for-specific-date-in-mongodb
const convertMillisecondsToMinutes = 60000;
db.trips.aggregate(
  [{
    $match: {
      startTime: {
        $gte: new Date("2016-03-10"),
        $lt: new Date("2016-03-11"),
      },
    },
  },
  {
    $addFields: {
      tripDuration: {
        $divide: [
          { $subtract: ["$stopTime", "$startTime"] },
          convertMillisecondsToMinutes,
        ],
      },
    },
  },
  {
    $group: {
      _id: null,
      duracaoMediaEmMinutos: { $avg: "$tripDuration" },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $ceil: "$duracaoMediaEmMinutos" },
    },
  },
  ],
);
