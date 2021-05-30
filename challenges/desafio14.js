use("aggregations");

db.trips.aggregate([
  {
    $match: {
      startTime: {
        $gte: ISODate("2016-03-10"),
      },
    },
  },
  {
    $group: {
      _id: "$bikeid",
      duracaoMediaEmMinutos: {
        $avg: {
          $divide: [
            {
              $subtract: ["$stopTime", "$startTime"],
            },
            60000,
          ],
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: { $ceil: "$duracaoMediaEmMinutos" },
    },
  },
  {
    $sort: {
      duracaoMedia: -1,
    },
  },
]);
