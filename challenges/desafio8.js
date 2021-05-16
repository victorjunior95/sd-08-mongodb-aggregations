db.air_routes.aggregate([
  { $match:
  { airplane: { $in: ["747", "380"] } },
  },
  {
    $lookup: {
      from: "air_alliances",
      localField: "airline.name",
      foreignField: "airlines",
      as: "xablau",
    },
  },
  { $project: { nome_da_alianca: { $arrayElemAt: ["$xablau.name", 0] }, empresa: "$airline.name", tipo_avião: "$airplane" } },

  { $match: { nome_da_alianca: { $ne: null } } },

  { $group: { _id: "$nome_da_alianca", totalRotas: { $sum: 1 } } },

  { $limit: 1 },

]);
