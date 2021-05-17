db.trips.aggregate([
  {
    $match: {
      $and: [
        {
          startTime: { $gt: ISODate("2016-03-10") },
        },
        {
          startTime: { $lt: ISODate("2016-03-11") },
        },
      ],
    },
  },
  {
    $group: {
      _id: null,
      media: {
        $avg: {
          $divide: [
            { $subtract: ["$stopTime", "$startTime"] },
            60000,
          ],
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: {
        $ceil: "$media",
      },
    },
  },
]);
