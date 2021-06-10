// Utilizando o dataset de dados de empresas aéreas, liste todas as parcerias
//   (coleção 'air_alliances') que voam rotas (coleção air_routes) com um
//   Boing (747) ou um Airbus (A380) para descubrir qual delas tem o maior número
//   de rotas com esses aviões

db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  {
    $lookup: {
      from: "air_routes",
      localField: "airlines",
      foreignField: "airline.name",
      as: "routes",
    },
  },
  { $unwind: "$routes" },
  {
    $match: {
      "routes.airplane": { $in: ["747", "380"] },
    },
  },
  {
    $group: {
      _id: "$name",
      totalRotas: { $sum: 1 },
    },
  },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
