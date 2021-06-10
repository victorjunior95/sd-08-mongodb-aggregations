db.trips.aggregate([
  { $addFields: {
    day: { $dayOfMonth: "$startTime" },
    month: { $month: "$startTime" },
    year: { $year: "$startTime" },
  } },
  { $match: { $and: [{ day: 10 }, { month: 3 }, { year: 2016 }] } },
  { $group: { _id: null, media: { $avg: { $subtract: ["$stopTime", "$startTime"] } } } },
  { $project: { _id: 0, duracaoMediaEmMinutos: { $ceil: { $divide: ["$media", 1000 * 60] } } } },
]);
