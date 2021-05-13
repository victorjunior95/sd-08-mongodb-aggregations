db.movies.aggregate([{ $match: { awards: { $regex: /Won.*Oscar/ } } },
  { $group: { _id: null,
    maior_rating: { $max: "$imdb.rating" },
    menor_rating: { $min: "$imdb.rating" },
    media_rating: { $round: [{ $avg: "$imdb.rating" }, 1] },
    desvio_padrao: { $round: [{ $stdDevSamp: "$imdb.rating" }, 1] } } }]);
