db.movies.aggregate([
  {
    $match: {
      awards: { $regex: /^Won.*Oscar*/i },
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
// tive auxilio dos alunos Ana-karine e arnaelcio
// ana karine
// https://github.com/tryber/sd-08-mongodb-aggregations/tree/ana-karine-mongodb-aggregations/challenges
// arnaelcio
// https://github.com/tryber/sd-08-mongodb-aggregations/tree/arnaelcio-mongodb-aggregations
