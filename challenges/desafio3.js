// Aplique mais um estágio na pipeline do desafio 2 para retornar os filmes ordenados
//   por ano e pela nota IMDB, de forma decrescente e por ordem alfabética

db.movies.aggregate([
  {
    $match: {
      "imdb.rating": { $gte: 7 },
      genres: {
        $nin: [
          "Crime",
          "Horror",
        ],
      },
      rated: {
        $in: [
          "PG",
          "G",
        ],
      },
      languages: {
        $all: [
          "English",
          "Spanish",
        ],
      },
    },
  },
  {
    $project: {
      _id: 0,
      titulo: "$title",
      avaliado: "$rated",
      notaIMDB: "$imdb.rating",
      votosIMDB: "$imdb.votes",
      ano: "$year",
    },
  },
  {
    $sort: {
      ano: -1,
      notaIMDB: -1,
      titulo: 1,
    },
  },
]);
