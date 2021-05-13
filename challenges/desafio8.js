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
  {
    $unwind: "$alliancesRoutes",
  },
  {
    $match: {
      $expr: {
        $in: [],
      },
      "alliancesRoutes.airplane": { $in: ["747", "380"] },
    },
  },
  {
    $project: {
      _id: "$name",
      totalRotas: { $size: "$arlines" },
    },
  },
  // {
  //   $limit: 1,
  // },
]);
