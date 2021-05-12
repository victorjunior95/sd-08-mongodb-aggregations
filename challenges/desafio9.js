db.trips.aggregate([
  { $match: { birthYear: { $exists: true, $ne: "" } } },
  { $set: { birthYear: { $toInt: "$birthYear" } } },
  { $group: {
    _id: null,
    maiorAnoNascimento: { $max: "$birthYear" },
    menorAnoNascimento: { $min: "$birthYear" },
  } },
  { $project: { _id: 0 } },
]);
