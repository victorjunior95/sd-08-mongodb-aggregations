db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  {
    $lookup: {
      from: "air_routes",
      let: { alliance_name: "$name", alliance_airlines: "$airlines" },
      pipeline: [
        {
          $match: {
            $and: [
              { airplane: { $in: ["747", "380"] } },
              { $expr: { $eq: ["$airline.name", "$$alliance_airlines"] } },
            ],
          },
        },
      ],
      as: "matchedResults",
    },
  },
  { $addFields: { matchedSize: { $size: "$matchedResults" } } },
  { $match: { matchedSize: { $gt: 0 } } },
  { $group: { _id: "$name", totalRotas: { $sum: "$matchedSize" } } },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
