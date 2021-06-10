// Contar quantos filmes cada um dos atores e atrizes do elenco (cast) já participou
//   e bter uma média do campo imdb.rating para cada um deles
//   A. Exiba:
//     Nome do ator ou atriz
//     Número de filmes em que participou
//     Média do imdb dos seus filmes arredondada para uma casa decimal ($round)
//   B. Considere somente os membros do elenco de filmes com o idioma 'English'
//   C. Exiba a lista em ordem decrescente de documentos pelo número de filmes
//     e nome do ator ou atriz

db.movies.aggregate([
  { $match: { languages: "English" } },
  { $unwind: "$cast" },
  {
    $group: {
      _id: "$cast",
      numeroFilmes: { $sum: 1 },
      mediaIMDB: { $avg: "$imdb.rating" },
    },
  },
  {
    $project: {
      _id: 1,
      numeroFilmes: 1,
      mediaIMDB: { $round: ["$mediaIMDB", 1] },
    },
  },
  {
    $sort: {
      numeroFilmes: -1,
      _id: -1,
    },
  },
]);
