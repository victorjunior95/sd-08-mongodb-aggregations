db.air_alliances.aggregate([
  {
    $lookup: {
      from: "air_routes",
      let: {
        airlines_alliences: "$airlines",
      },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                {
                  $or: [
                    { $eq: ["$airplane", "747"] },
                    { $eq: ["$airplane", "380"] },
                  ],
                },
                {
                  $in: ["$airline.name", "$$airlines_alliences"],
                },
              ],
            },
          },
        },
      ],
      as: "routes",
    },
  },
  {
    $match: { name: "SkyTeam" },
  },
  {
    $project: {
      _id: "$name",
      totalRotas: { $size: "$routes" },
    },
  },
]);
