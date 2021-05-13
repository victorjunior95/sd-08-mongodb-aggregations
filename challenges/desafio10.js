db.trips.aggregate([{ $group: { _id: usertype, oi: { $sum: 1 },
} },
{
  $project: {
    duracaoMedia: { $subtract: ["$startTime", "$stopTime"] } } },
]);
