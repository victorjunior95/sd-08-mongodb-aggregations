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
      _max: {
        $max: "$imdb.rating",
      },
      _min: {
        $min: "$imdb.rating",
      },
      _avg: {
        $avg: "$imgb.rating",
      },
      _stdDevSamp: {
        $stdDevSamp: "$imdb.rating",
      },
    },
  },
  {
    $project: {
      _id: 0,
      maior_rating: "$_max",
      menor_rating: "$_min",
      media_rating: {
        $round: ["$_avg", 1],
      },
      desvio_padrao: {
        $round: ["$_stdDevSamp", 1],
      },
    },
  },
]);
