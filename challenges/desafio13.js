db.trips.aggregate([
  { $match: {
    startTime: {
      $gte: ISODate("2016-03-10T00:00:00Z"),
      $lte: ISODate("2016-03-10T23:59:59Z"),
    },
  },
  //  separando os documentos que correspondem ao dia 10/03/2016
  },
  { $addFields: {
    time: { $subtract: ["$stopTime", "$startTime"] },
  },
  //  adicionando o campo time , com a duração das viajens
  },
  { $group: {
    _id: "xablau",
    duracaoMediaEmMinutos: { $avg: "$time" },
    //  tirando a média de todas viajens ( em milisegundos )
  },
  },
  { $project: {
    duracaoMediaEmMinutos: { $ceil: { $divide: ["$duracaoMediaEmMinutos", 60000] } },
    //  arredondando pra cima a duração em minutos
    _id: 0,
  },
  },
]);

//  ceil : arredonda pra cima.
//  { $ceil: <number> }
//  https://docs.mongodb.com/manual/reference/operator/aggregation/ceil/

//  consultei o repositório de Rita Jeveaux
//  https://github.com/tryber/sd-08-mongodb-aggregations/pull/44/files
