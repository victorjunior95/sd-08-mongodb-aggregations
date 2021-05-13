const convertHours = 3600000;
db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: {
        $avg: {
          $subtract: ["$stopTime", "$startTime"],
          // https://docs.mongodb.com/manual/reference/operator/aggregation/subtract/
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: {
        $round: [{ $divide: ["$duracaoMedia", convertHours] }, 2],
        // https://docs.mongodb.com/manual/reference/operator/aggregation/divide/
      },
    },
  },
]);
