db.trips.aggregate([
  {
    $addFields: {
      day: { $dayOfWeek: "$startTime" },
    },
  },
  {
    $match: {
      day: 5,
    },
  },
]);
