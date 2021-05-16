// Desafio 3 - Agora que você tem os campos essenciais, aplique mais um estágio na pipeline
// do desafio anterior que atenda a seguinte demanda:

//  a) Retorne esses filmes ordenados por ano e nota IMDB de forma decrescente e por ordem
//  alfabética.
//  O resultado da sua query deve ter o seguinte formato:
//    { "titulo" : "McFarland, USA",
//      "avaliado" : "PG",
//      "notaIMDB" : 7.5,
//      "votosIMDB" : 14091,
//      "ano" : 2015
//    }
db.movies.aggregate([
  { $match:
    { "imdb.rating": { $gte: 7 },
      genres: { $nin: ["Crime", "Horror"] },
      rated: { $in: ["PG", "G"] },
      languages: { $all: ["English", "Spanish"] },
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
