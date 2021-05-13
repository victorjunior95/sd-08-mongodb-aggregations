db.air_routes.aggregate([
  {
    $match: {
      airplane: {
        $in: ["747", "380"],
      },
    },
  },
  {
    $group: {
      _id: "$airline.name",
      rotasAirLine: { $sum: 1 },
    },
  },
  {
    $lookup: {
      from: "air_alliances",
      localField: "_id",
      foreignField: "airlines",
      as: "alliances",
    },
  },
  {
    $group: {
      _id: "$alliances.name",
      totalRotas: { $sum: "$rotasAirLine" },
    },
  },
  {
    $unwind: "$_id",
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
