db.movies.aggregate([
  {
    $match: {
      languages: "English",
    },
  },
  {
    $unwind: "$cast",
  },
  {
    $group: {
      _id: "$cast",
      numeroFilmes: { $sum: 1 },
      mediaIMDB: { $avg: "$imdb.rating" },
    },
  },
  //  agrupando os documentos de acordo com o ator, calculando o número de filmes de acordo
  //  com o numero de documentos e gerando a meédia de rating que não pode ser arredondada
  //  nessa etapa.
  {
    $project: {
      _id: 1,
      numeroFilmes: 1,
      mediaIMDB: { $round: ["$mediaIMDB", 1] },
    },
  },
  //  arredondamento da média.
  {
    $sort: {
      numeroFilmes: -1,
      _id: -1,
    },
  },
]);

//  $unwind : cria um array de saída para elemento do array de entrada.
//  { $unwind: <field path> }
//  https://docs.mongodb.com/manual/reference/operator/aggregation/unwind/

//  consultei o repositório de Arnaelcio Gomes:
//  https://github.com/tryber/sd-08-mongodb-aggregations/pull/57/files
