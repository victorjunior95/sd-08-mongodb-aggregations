db.air_routes.aggregate(
  {
    $lookup: {
      from: "air_alliances",
      localField: "airline.name",
      foreignField: "airlines",
      as: "aircompany",
    },
  },
  {
    $match: {
      airplane: {
        $in: ["747", "380"],
      },
      "aircompany.name": {
        $exists: true,
      },
    },
  },
  {
    $unwind: "$aircompany",
  },
  {
    $group: {
      _id: "$aircompany.name", totalRotas: { $sum: 1 },
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
);