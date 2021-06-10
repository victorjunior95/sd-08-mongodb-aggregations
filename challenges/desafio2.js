// Utilizando o mesmo pipeline do desafio 1, retorne apenas os seguintes campos,
//   com os nomes modificados conforme indicado:
//   A. title --> titulo
//   B. rated --> avaliado
//   C. imdb.rating --> notaIMDB
//   D. imdb.votes --> votosIMDB
//   E. year --> ano

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
]);
