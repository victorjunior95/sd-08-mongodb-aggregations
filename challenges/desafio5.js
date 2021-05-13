// crie uma pipeline que retorne o title do vigésimo quinto filme da agregação
// que satisfaz as seguintes condições:
// countries é Estados unidos
// tomatoes.viewer.rating maior ou igual a 3
// Crie um novo campo chamado num_favs
// que represente quantos atores ou atrizes da nossa lista de favoritos aparecem no elenco
// (campo cast) do filme.
// Ordene os resultados por num_favs, tomatoes.viewer.rating e title, todos em ordem decrescente.
// Dica: coloque a lista de atores e atrizes favoritos
// em uma variável e explore operadores como $size e $setIntersection.

// O resultado da sua query deve ter o seguinte formato:

// { "title" : <nome_do_filme> }

const actors = [
  "Sandra Bullock",
  "Tom Hanks",
  "Julia Roberts",
  "Kevin Spacey",
  "George Clooney",
];

db.movies.aggregate(
  [
    {
      $match: {
        countries: "USA",
        "tomatoes.viewer.rating": { $gte: 3 },
        cast: { $exists: 1 },
      },
    },
    {
      $addFields: {
        num_favs: {
          $size: {
            $setIntersection: ["$cast", actors],
          },
        },
      },
    },
    {
      $sort: {
        num_favs: -1,
        "tomatoes.viewer.rating": -1,
        title: -1,
      },
    },
    {
      $project: {
        title: 1,
        _id: 0,
      },
    },
    {
      $skip: 24,
    },
    {
      $limit: 1,
    },
  ],
);
