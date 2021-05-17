const MINUTO = 60 * 1000;
db.trips.aggregate([
  { $match: {
    startTime: {
      $gte: ISODate("2016-03-10"),
      $lte: ISODate("2016-03-11") } } },
  { $addFields: {
    duracao: {
      $divide: [
        { $subtract: ["$stopTime", "$startTime"] },
        MINUTO,
      ] } } },
  { $group: {
    _id: null,
    duracaoMediaEmMinutos: {
      $avg: "$duracao" } } },
  { $project: {
    _id: 0,
    duracaoMediaEmMinutos: {
      $ceil: "$duracaoMediaEmMinutos" } } }]);
