db.movies.aggregate([
  {
    $match: {
      $and: [
        { countries: "USA" },
        { "tomatoes.viewer.rating": { $gte: 3 } },
        {
          cast: {
            $in: [
              "Sandra Bullock",
              "Tom Hanks",
              "Julia Roberts",
              "Kevin Spacey",
              "George Clooney",
            ],
          },
        },
      ],
    },
  },
  {
    $addFields: {
      num_favs: {
        $size: {
          $setIntersection: [
            "$cast",
            [
              "Sandra Bullock",
              "Tom Hanks",
              "Julia Roberts",
              "Kevin Spacey",
              "George Clooney",
            ],
          ],
        },
      },
    },
    //  adiciona o numero de favoritos. para isto, faz um array com a intersecção de cast e o
    //  array dos favoritos. Depois calcula o tamanho deste array, e o adiciona como valor do campo
    //  num_fav
  },
  {
    $sort: {
      num_favs: -1,
      "tomatoes.viewer.rating": -1,
      title: -1,
    },
  },
  {
    $skip: 24,
  },
  {
    $limit: 1,
  },
  {
    $project: {
      _id: 0,
      title: 1,
    },
  },
]);

//  addFields: adiciona um campo com um determinado valor:
//  { $addFields: { <newField>: <expression>, ... } }
//  https://docs.mongodb.com/manual/reference/operator/aggregation/addFields/#mongodb-pipeline-pipe.-addFields

//  setIntersection: pega dois ou mais arrays e retorna um array que contenha a intersecção deles.
//  https://docs.mongodb.com/manual/reference/operator/aggregation/setIntersection/

//  consultei o repositório de Arnaelcio Gomes:
//  https://github.com/tryber/sd-08-mongodb-aggregations/pull/57/files
