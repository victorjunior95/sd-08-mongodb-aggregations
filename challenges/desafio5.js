// Considere a lista abaixo de atores ou atrizes preferidos:
//   Sandra Bullock
//   Tom Hanks
//   Julia Roberts
//   Kevin Spacey
//   George Clooney
// Crie uma pipeline que retorne o 'title' do 25º filme da agregação que:
//   A. 'countries' é 'Estados unidos'
//   B. 'tomatoes.viewer.rating' maior ou igual a 3
//   C. um novo campo chamado 'num_favs' represente quantos atores ou atrizes da lista
//     aparecem no elenco (campo cast) do filme
//   D. Ordene os resultados por 'num_favs', 'tomatoes.viewer.rating' e 'title',
//     todos em ordem decrescente.
//   Dica: coloque a lista de atores e atrizes favoritos em uma variável
//     e explore operadores como $size e $setIntersection

const favorites = [
  "Sandra Bullock",
  "Tom Hanks",
  "Julia Roberts",
  "Kevin Spacey",
  "George Clooney",
];

db.movies.aggregate([
  {
    $match: {
      countries: "USA",
      "tomatoes.viewer.rating": { $gte: 3 },
      cast: { $in: favorites },
    },
  },
  {
    $addFields: {
      num_favs: {
        $size: {
          $setIntersection: [
            "$cast",
            favorites,
          ],
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
      _id: 0,
      title: 1,
    },
  },
  { $skip: 24 },
  { $limit: 1 },
]);
