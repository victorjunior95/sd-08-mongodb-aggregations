db.trips.aggregate([
  { $group: { _id: "$usertype", media: { $avg: { $subtract: ["$stopTime", "$startTime"] } } } },
  { $project: { tipo: "_id", duracaoMedia: { $round: [{ $divide: ["$media", 3600000] }, 2] } } },

]);
