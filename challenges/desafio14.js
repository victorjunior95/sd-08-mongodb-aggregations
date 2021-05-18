db.trips.aggregate([
  {
    $group: {
      _id: "$bikeid",
      averageOfTrip: {
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
      _id: false,
      bikeId: "$_id",
      duracaoMedia: {
        $ceil: "$averageOfTrip",
      },
    },
  },
  {
    $sort: {
      duracaoMedia: -1,
    },
  },
  { $limit: 5 },
]);
