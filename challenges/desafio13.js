const convertMinutes = 60000;
db.trips.aggregate([
{
  $match: {
    startTime: {
      $gt: ISODate("2016-03-10"),
      $lt: ISODate("2016-03-11"),
    },
  },
},
  {
  $group: {
    _id: null,
    duracaoMedia: {
      $avg: {
        $subtract: ["$stopTime", "$startTime"],
      },
    },
  },
},
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $ceil: { $divide: ["$duracaoMedia", convertMinutes] },
      },
    },
  },
]);
