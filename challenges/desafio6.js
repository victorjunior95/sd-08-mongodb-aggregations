db.movies.aggregate([
  {
    $match: {
      $and: [
        {
          awards: /Won/,
        },
        {
          awards: /Oscar/,
        },
      ],
    },
  },
  {
    $group: {
      _id: null,
      max: {
        $max: "$imdb.rating",
      },
      min: {
        $min: "$imdb.rating",
      },
      avg: {
        $avg: "$imgb.rating",
      },
      stdDevSamp: {
        $stdDevSamp: "$imdb.rating",
      },
    },
  },
  {
    $project: {
      _id: 0,
      maior_rating: "$max",
      menor_rating: "$min",
      media_rating: {
        $round: ["$avg", 1],
      },
      desvio_padrao: {
        $round: ["$stdDevSamp", 1],
      },
    },
  },
]);
