db.trips.aggregate([
  { $addFields: { dateToSearch: { $dateToString: { format: "%d/%m/%Y", date: "$startTime" } } } },
  { $match: { dateToSearch: { $eq: "10/03/2016" } } },
  { $group: { _id: 0, duracaoMedia: { $avg: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000] } } } },
  { $project: { _id: 0, duracaoMediaEmMinutos: { $ceil: "$duracaoMedia" } } }]);
