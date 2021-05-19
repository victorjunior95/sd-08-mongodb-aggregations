/** Consultei o repositório do Wesley Paulo para resolver essa parte.
https://github.com/tryber/sd-08-mongodb-aggregations/pull/66/commits/a0527a313021d4887db9fa5e5623221ee47eda1c
*/
db.air_alliances.aggregate([{ $lookup: { from: "air_routes", localField: "airlines", foreignField: "airline.name", as: "rotas" } }, { $unwind: "$rotas" }, { $match: { "rotas.airplane": { $in: ["747", "380"] } } }, { $group: { _id: "$name", count: { $sum: 1 } } }, { $sort: { count: -1 } }, { $project: { _id: 1, totalRotas: "$count" } }, { $limit: 1 }]);
