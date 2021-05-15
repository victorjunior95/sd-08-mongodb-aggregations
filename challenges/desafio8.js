db.air_alliances.aggregate([
  {
    $unwind: "$airlines",
  },
  {
    $lookup: {
      from: "air_routes",
      let: {
        airline: "$airlines",
      },
      pipeline: [
        {
          $match: {
            $and: [
              {
                $expr: {
                  $eq: ["$$airline", "$airline.name"],
                },
              },
              { airplane:
                {
                  $in: ["747", "380"],
                },
              },
            ],
          },
        },
      ],
      as: "route",
    },
  },
  {
    $addFields: {
      numRoutes: { $cond: { if: { $isArray: "$route" }, then: { $size: "$route" }, else: 0 } },
    },
  },
  {
    $group: {
      _id: "$name",
      totalRotas: { $sum: "$numRoutes" },
    },
  },
  {
    $sort: {
      totalRotas: -1,
    },
  },
  {
    $limit: 1,
  },
]);
