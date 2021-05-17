db.trips.aggregate([
  { $group: { diaDaSemana: { $avg: { $dayOfWeek: "$startTime" } }, total: { $sum: 1 }, _id: null } },
  { $project: { diaDaSemana: { $ceil: "$diaDaSemana" }, total: { $avg: "$total" }, _id: 0 } },

]);
// { "diaDaSemana" : 5, "total" : 357594 }
