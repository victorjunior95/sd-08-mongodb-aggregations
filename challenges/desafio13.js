// const diaDaPesquisa = "10/03/2016";

db.trips.aggregate([
  {
    $match: {
      startTime: {
        $gte: new Date("2016-03-10T00:00:00.000Z"),
        $lte: new Date("2016-03-10T23:59:59.000Z"),
      },
    },
  },
  {
    $group: {
      _id: null,
      mediaViagens: { $avg: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60 * 1000] } },
    },
  },
  {
    $project: {
      _id: false,
      duracaoMediaEmMinutos: { $ceil: "$mediaViagens" },
    },
  },
]);
