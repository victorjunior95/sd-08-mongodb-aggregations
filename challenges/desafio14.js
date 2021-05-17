db.trips.aggregate([
  {
    $project: {
      bikeid: 1,
      duracaoEmMinutos: {
        $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000],
      },
    },
  },
  {
    $group: {
      _id: "$bikeid",
      media: { $avg: "$duracaoEmMinutos" },
    },
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: { $ceil: "$media" },
    },
  },
  { $sort: { duracaoMedia: -1 } },
  { $limit: 5 },
]);
