db.trips.aggregate([
  {
    $addFields: {
      diaDaSemana: { $dayOfWeek: "$startTime" },
      duracao: { $subtract: ["$stopTime", "$startTime"] },
      filtro: ISODate("2016-03-10T00:00:00Z"),
    },
  },
  {
    $group: {
      _id: null,
      duracaoMedia: { $avg: "$duracao" },
    },
  },
  {
    $project: {
      duracaoMediaEmMinutos: { $divide: ["$duracaoMedia", 1000 * 60] },
    },
  },
  {
    $project: {
      duracaoMediaEmMinutos: { $ceil: "$duracaoMediaEmMinutos" },
      _id: 0,
    },
  },
]);

db.trips.aggregate([
  {
    $addFields: {
      diaDaSemana: { $dayOfWeek: "$startTime" },
      duracao: { $subtract: ["$stopTime", "$startTime"] },
      filtro: ISODate("2016-03-10T00:00:00Z"),
    },
  },
  {
    $match: {
      startTime: "2016-03-10T00:00:00Z",
    },
  },

]);
