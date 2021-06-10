// Considere todos os filmes que ganharam o Oscar pelo menos uma vez
// Calcule das avaliações (campo imdb.rating):
//   A. o maior valor
//   B. menor valor
//   C. média
//   D. desvio padrão
// Obs. Aredondar a média e o desvio padrão para uma casa decimal (utilizar $round)
// Dica 1: Esses filmes começam com uma sequência de string parecida 'Won x Oscar(s)',
//   portanto vale usar o operador $regex
// Dica 2: Utilize $stdDevSamp para calcular o desvio padrão

db.movies.aggregate([
  {
    $match: {
      awards: { $regex: /won\s\d{1,3}\s(oscar)s?/i },
    },
  },
  {
    $group: {
      _id: null,
      maior_rating: { $max: "$imdb.rating" },
      menor_rating: { $min: "$imdb.rating" },
      media_rating: { $avg: "$imdb.rating" },
      desvio_padrao: { $stdDevSamp: "$imdb.rating" },
    },
  },
  {
    $project: {
      _id: 0,
      maior_rating: 1,
      menor_rating: 1,
      media_rating: { $round: ["$media_rating", 1] },
      desvio_padrao: { $round: ["$desvio_padrao", 1] },
    },
  },
]);
