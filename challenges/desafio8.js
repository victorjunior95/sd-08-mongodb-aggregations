db.air_alliances.aggregate([
  {
    $unwind: "$airlines",
  },
  {
    $lookup: {
      from: "air_routes",
      let: {
        a_airlines: "$airlines",
      },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: ["$airline.name", "$$a_airlines"],
            },
          },
        },
        {
          $project: {
            _id: 0,
            airplane: 1,
          },
        },
      ],
      as: "route",
    },
  },
  {
    $unwind: "$route",
  },
  {
    $match: {
      "route.airplane": {
        $in: ["747", "380"],
      },
    },
  },
  {
    $group: {
      _id: "$name",
      totalRotas: { $sum: 1 },
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
