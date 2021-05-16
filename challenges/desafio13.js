const milisegMinutos = 60 * 1000;
const aggregation = [
  {

    $match: {
      $and:
                [
                  { startTime: { $gte: new Date("2016-03-10T00:00:00.000Z") } },
                  { startTime: { $lt: new Date("2016-03-11T00:00:00.000Z") } },
                ],
    },
  },
  {
    $group: {
      _id: null,
      duracaoMedia:
            {
              $avg:
                {
                  $subtract: ["$stopTime", "$startTime"],
                },
            },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $ceil: { $divide: ["$duracaoMedia", milisegMinutos] } },
    },
  },
];
db.trips.aggregate(aggregation);
// https://stackoverflow.com/questions/19819870/date-query-with-isodate-in-mongodb-doesnt-seem-to-work
