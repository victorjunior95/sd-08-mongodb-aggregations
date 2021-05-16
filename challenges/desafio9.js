db.trips.aggregate([
  { $match: { birthYear: { $not: /^$/ } } },
  { $match: { birthYear: { $exists: true } } },
  { $group: {
    _id: "birthYear",
    maiorAnoNascimento: { $max: { $toInt: "$birthYear" } },
    menorAnoNascimento: { $min: { $toInt: "$birthYear" } },
  } },
  { $project: { _id: 0 } },
]);
