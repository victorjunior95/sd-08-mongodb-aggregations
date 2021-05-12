// solucao para encontarr arrays nao vazios retirada daqui: https://stackoverflow.com/questions/7811163/query-for-documents-where-array-size-is-greater-than-1
db.air_alliances.aggregate(
  [
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
              $expr: { $eq: ["$$airline", "$airline.name"] },
              airplane: { $in: ["747", "380"] },
            },
          },
        ],
        as: "routeInfo",
      },
    },
    {
      $match: {
        "routeInfo.1": { $exists: true },
      },
    },
    {
      $unwind: "$routeInfo",
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
  ],
);
