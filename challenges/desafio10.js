db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: { $avg: { $subtract: ["$stopTime", "$startTime"] } },
    },
  },
  {
    /**
     * specifications: The fields to
     *   include or exclude.
     */
    $project: {
      tipo: "$_id",
      duracaoMedia: { $round: [{ $divide: ["$duracaoMedia", 3600000] }, 2] },
      _id: 0,
    },
  },
]);
