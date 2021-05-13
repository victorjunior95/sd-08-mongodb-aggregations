db.trips.aggregate([
  { $addFields: {
    dia: { $dayOfMonth: "$startTime" },
    mes: { $month: "$startTime" },
    ano: { $year: "$startTime" },
  } },
  { $match: { $and: [{ dia: 10 }, { mes: 3 }, { ano: 2016 }] } },
  { $group: { _id: null, media: { $avg: { $subtract: ["$stopTime", "$startTime"] } } } },
  { $project: { _id: 0, duracaoMediaEmMinutos: { $ceil: { $divide: ["$media", 1000 * 60] } } } },
]);
