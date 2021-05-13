db.trips.aggregate([
  { $addFields: {
    type: { $type: "$birthYear" },
  } },
  { $match: { type: "int" } },
  { $group: {
    _id: null,
    maiorAnoNascimento: { $max: "$birthYear" },
    menorAnoNascimento: { $min: "$birthYear" },
  } },
  { $project: { _id: 0 } },
]);
