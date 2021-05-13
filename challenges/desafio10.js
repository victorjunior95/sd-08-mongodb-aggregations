db.trips.aggregate([
  {
    $addFields: {
      difTime: {
        $divide: [
          { $subtract: [
            "$stopTime",
            "$startTime",
          ] },
          { $multiply: [
            1000, 60, 60,
          ] },
        ],
      },
    },
  },
  {
    $group: {
      _id: "$usertype",
      media: { $avg: "$difTime" },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: {
        $round: [
          "$media",
          2,
        ],
      },
    },
  },
]);
