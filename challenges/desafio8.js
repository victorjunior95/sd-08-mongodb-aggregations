db.air_alliances.aggregate([
  {
    $lookup: {
      from: "air_routes",
      let: { airlineNames: "$airlines" },
      pipeline: [
        {
          $match: {
            $expr: {
              $in: ["$airline.name", "$$airlineNames"],
            },
            airplane: { $in: ["747", "380"] },
          },
        },
      ],
      as: "planes",
    },
  },
  {
    $project: {
      _id: "$name",
      totalRotas: { $size: "$planes" },
    },
  },
  {
    $sort: { totalRotas: -1 },
  },
  {
    $limit: 1,
  },
]);
