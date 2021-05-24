db.movies.aggregate([
    {
        $match: {
            $and: [
                { "imdb.rating": { $gt: 6 } },
                { genres: { $not: { $in: ["Crime", "Horror"] } } },
                { rated: { $in: ["PG", "G"] } },
                { languages: { $all: ["English", "Spanish"] } },
            ],
        },
    },
]);
//  db.collection.aggregate()
//  db.collection.aggregate(pipeline, options)
//  https://docs.mongodb.com/manual/reference/method/db.collection.aggregate/

//  $match: retorna os documentos que correspondem á uma condição específica.
//  https://docs.mongodb.com/manual/reference/operator/aggregation/match/

//  $and : retorna true caso todas as condições sejam satisfeitas.
//  https://docs.mongodb.com/manual/reference/operator/aggregation/and/

//  $all : seleciona o(s) documento(s) que contém todos elementos especificados.
//  https://docs.mongodb.com/manual/reference/operator/query/all/

//  consultei o repositório de Arnaelcio Gomes:
//  https://github.com/tryber/sd-08-mongodb-aggregations/pull/57/files