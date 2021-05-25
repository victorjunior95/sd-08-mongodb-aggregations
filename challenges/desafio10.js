db.trips.aggregate([
  { $group: {
    _id: "$usertype",
    duracaoMedia:
        { $avg:
        { $subtract: ["$stopTime", "$startTime"] },
        },
  },
  },
  { $project: { _id: 0,
    tipo: "$_id",
    duracaoMedia: {
      $round: [{ $divide: ["$duracaoMedia", 60 * 60 * 1000] }, 2],
      //   x milisegundos / 60*60*1000 = x horas
    },
  },
  },
  { $sort: { duracaoMedia: 1 } },
]);

//  subtract: realiza uma subração. Para datas, retorna em milisegundos.
//  { $subtract: [ <expression1>, <expression2> ] }
//  https://docs.mongodb.com/manual/reference/operator/aggregation/subtract/

//  divide: realiza uma divisão
//  { $divide: [ <expression1>, <expression2> ] }
//  https://docs.mongodb.com/manual/reference/operator/aggregation/divide/

//  consultei o repositório de Rita Jeveaux
//  https://github.com/tryber/sd-08-mongodb-aggregations/pull/44/files
