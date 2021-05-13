// Utilizando o mesmo pipeline anterior,
// retorne apenas os campos title, rated, imdb.rating, imdb.votes e year,
// modificando seus nomes para titulo, avaliado, notaIMDB, votosIMDB e ano, respectivamente.

// O resultado da sua query deve ter o seguinte formato:
// {
// "titulo" : "A Streetcar Named Desire",
// "avaliado" : "PG",
// "notaIMDB" : 8.1,
// "votosIMDB" : 72364,
// "ano" : 1951
// }

db.movies.aggregate(
  [
    {
      $match: {
        "imdb.rating": { $gte: 7 },
        genres: { $nin: ["Crime", "Horror"] },
        rated: { $in: ["PG", "G"] },
        languages: { $all: ["English", "Spanish"] },
      },
    },
    {
      $project: {
        titulo: "$title",
        avaliado: "$rated",
        notaIMDB: "$imdb.rating",
        votosIMDB: "$imdb.votes",
        ano: "$year",
        _id: 0,
      },
    },
  ],
);
