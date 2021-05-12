// Desafio 7
// Vamos nos aprofundar um pouco mais em nossa coleção de filmes.

// Conte quantos filmes cada um dos atores e atrizes do elenco (cast)
// já participou e obter uma média do campo imdb.rating para cada um desses atores e atrizes.
// Traga o nome do ator ou atriz, número de filmes em que participou e
// a média do imdb desses filmes arredondada para uma casa decimal usando o operador $round.
// Considere somente os membros do elenco de filmes com o idioma inglês (English).
// Exiba a lista em ordem decrescente de documentos pelo número de filmes e nome do ator ou atriz.
// Sua query deve retornar 47055 documentos.
// Cada documento no resultado deve ter o seguinte formato:
// { "_id" : "John Wayne", "numeroFilmes" : 107, "mediaIMDB" : 6.4 }
db.movies.aggregate([{ $match: { languages: "English" } }, { $unwind: "$cast" }, { $group: { _id: "$cast", participation: { $sum: 1 }, average_rating: { $avg: "$imdb.rating" } } }, { $project: { _id: 1, participation: 1, average_rating: { $round: ["$average_rating", 1] } } }, { $sort: { participation: -1, _id: -1 } }]);
