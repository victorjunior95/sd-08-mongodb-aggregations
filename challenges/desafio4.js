db.movies.aggregate([
  {
    $project: {
      _id: 0,
      title_split: { $split: ["$title", " "] },
    },
  },
  { $match: { title_split: { $size: 1 } } },
  { $sort: { title_split: 1 } },
]);
//  $split: transofrma uma string num array de substrings baseado num delimitador
//  { $split: [ <string expression>, <delimiter> ] }
//  https://docs.mongodb.com/manual/reference/operator/aggregation/split/

//  consultei o repositório de Arnaelcio Gomes:
//  https://github.com/tryber/sd-08-mongodb-aggregations/pull/57/files
