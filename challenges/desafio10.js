// Desafio 10
// Encontre a média de viagens por tipo de usuário.
// Exiba o valor em horas com apenas duas casas decimais
// Exiba a média de viagens ordenada de forma crescente.
// Para arredondar a média use o $round.

// O resultado da sua query deve ter o seguinte formato:

// { "tipo" : <tipo>, "duracaoMedia" : <duracaoMedia> }
const ONE_HOUR_IN_MILISECONDS = 3600000;

db.trips.aggregate([{ $group: { _id: "$usertype", duracaoMedia: { $avg: { $subtract: ["$stopTime", "$startTime"] } } } }, { $project: { tipo: "$_id", duracaoMedia: { $round: [{ $divide: ["$duracaoMedia", ONE_HOUR_IN_MILISECONDS] }, 2] }, _id: 0 } }, { $sort: { duracaoMedia: 1 } }]);
