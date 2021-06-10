// Crie uma pipeline que retorna documentos com o novo campo 'title_split', em que:
//   A. 'title_split' contenha uma lista de palavras presentes em 'title'
//   B. A pipeline retorne apenas filmes com o título composto apenas de uma palavra
//   C. A pipeline seja ordenada por 'title' em ordem alfabética
//   Dica: utilize os operadores $split, $size e $sort

db.movies.aggregate([
  {
    $project: {
      _id: 0,
      title_split: {
        $split: [
          "$title",
          " ",
        ],
      },
    },
  },
  {
    $match: {
      title_split: { $size: 1 },
    },
  },
  {
    $sort: { title_split: 1 },
  },
]);
