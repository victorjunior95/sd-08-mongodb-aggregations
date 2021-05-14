// db.movies.aggregate([
//   {
//     $match: {
//       "filme.nome": "Toy Story",
//     },
//   },
//   {
//     $group: {
//       _id: null,
//       count: {
//         $sum: 1,
//       },
//     },
//   },
// ]);
// ----------------------------------
// db.movies.aggregate([
//   {
//     $match: {
//       "filme.nome": "Toy Story",
//     },
//   },
//   {
//     $count: "totalDeVoos",
//   },
// ]);
// db.voos.aggregate([{ $match: { "empresa.nome": "AMERICAN AIRLINES" } }, { $sort: { decolagens: -1 } }, { $limit: 1 } ]);
// no group você faz as somas e tal. No project, altera nomes.