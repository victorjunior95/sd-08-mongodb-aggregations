db.trips.aggregate([
  { $addFields: {
    dateToString: { $dateToString: { format: "%Y-%m-%d", date: "$startTime" } },
  } },
  { $match: { dateToString: "2016-03-10" } },
  { $addFields: {
    time: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000] },
  /* source: https://stackoverflow.com/questions/41138877/how-to-calculate-timestamp-difference-in-mongodb-in-hours */
  } },
  { $group: {
    _id: null,
    totalTime: { $avg: "$time" },
  } },
  { $project: {
    duracaoMediaEmMinutos: { $ceil: "$totalTime" },
    _id: 0,
  } },
]);
