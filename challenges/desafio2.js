db.movies.aggregate([
  {
    $match: {
      $and: [
        { "imdb.rating": { $gte: 7 } },
        { genres: { $not: { $in: ["Crime", "Horror"] } } },
        { rated: { $in: ["PG", "G"] } },
        { languages: { $all: ["English", "Spanish"] } },
      ],
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

//  $project: leva o(s) documento(s) á uma proxima etapa de pipeline:
//  pode suprimir o campo _id, adicionar novos campos, ou renomear campos existentes.
//  https://docs.mongodb.com/manual/reference/operator/aggregation/project/
//  renomear os campos: https://stackoverflow.com/questions/35620274/mongo-aggregate-rename-field-with-project
