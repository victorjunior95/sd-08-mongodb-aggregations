// Desafio 3
// Agora que você tem os campos essenciais,
// aplique mais um estágio na pipeline do desafio anterior que atenda a seguinte demanda:

// Retorne esses filmes ordenados por ano e nota IMDB de forma decrescente e por ordem alfabética.

db.movies.aggregate([{ $match: { $and: [{ "imdb.rating": { $gte: 7 } }, { genres: { $nin: ["Crime", "Horror"] } }, { rated: { $in: ["PG", "G"] } }, { languages: { $all: ["English", "Spanish"] } }] } }, { $project: { titulo: "$title", avaliado: "$rated", notaIMDB: "$imdb.rating", votosIMDB: "$imdb.votes", ano: "$year", _id: 0 } }, { $sort: { ano: -1, notaIMDB: -1, titulo: 1 } }]);

// O resultado da sua query deve ter o seguinte formato:
// { "titulo" : "McFarland, USA",
// "avaliado" : "PG", "notaIMDB" : 7.5, "votosIMDB" : 14091, "ano" : 2015 }
// Demais documentos
