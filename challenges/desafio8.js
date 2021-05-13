db.air_alliances.aggregate([
  // {
  //   $unwind: "$airlines",
  // },
  {
    $lookup: {
      from: "air_routes",
      localField: "airlines",
      foreignField: "airline.name",
      as: "alliancesRoutes",
    },
  },
  // {
  //   $match: {
  //     "alliancesRoutes.airplane": { $in: [747, 380] },
  //   },
  // },
  {
    $limit: 1,
  },
]);
