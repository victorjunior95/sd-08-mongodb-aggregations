db.movies.aggregate([
  {
    $match: {
      awards: /Won.*Oscar/i },
  },
  {
    $group: {
      _id: 0,
      valuation: { $push: "$imdb.rating" },
    },
  },
  //  criação do array valuation com todos os ratings.
  {
    $project: {
      _id: 0,
      maior_rating: { $max: "$valuation" },
      menor_rating: { $min: "$valuation" },
      media_rating: { $round: [{ $avg: "$valuation" }, 1] },
      desvio_padrao: { $round: [{ $stdDevSamp: "$valuation" }, 1] },
    },
  },
]);
//  stdDevSamp: calcula o desvio padrão ( sample standard desviation)
//  de uma expressão ou lista de expressões
//  { $stdDevSamp: [ <expression1>, <expression2> ... ]  }
//  https://docs.mongodb.com/manual/reference/operator/aggregation/stdDevSamp/
//  consultei o repositório de Arnaelcio Gomes:
//  https://github.com/tryber/sd-08-mongodb-aggregations/pull/57/files
