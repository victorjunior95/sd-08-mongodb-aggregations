db.trips.aggregate([
  {
    $group: {
      _id: { $dayOfWeek: "$startTime" },
      totalDeViagens: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      diaDaSemana: "$_id",
      total: "$totalDeViagens",
    },
  },
  {
    $sort: { total: -1 },
  },
  {
    $limit: 1,
  },
]);

//  dayOfWeek:: Retorna o dia da semana para uma data como um número entre 1 (domingo) e 7 (sábado).
//  { $dayOfWeek: <dateExpression> }
//  https://docs.mongodb.com/manual/reference/operator/aggregation/dayOfWeek/

//  consultei o repositório de Rita Jeveaux
//  https://github.com/tryber/sd-08-mongodb-aggregations/pull/44/files
