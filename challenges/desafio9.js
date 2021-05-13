db.trips.aggregate([
  { $match: { birthYear: { $nin: [""] } } },
  { $group: {
    _id: null,
    maiorAnoNascimento: { $max: { $toInt: "$birthYear" } },
    menorAnoNascimento: { $min: { $toInt: "$birthYear" } },
  } },
  { $project: { _id: 0, maiorAnoNascimento: 1, menorAnoNascimento: "$menorAnoNascimento" } },
]).pretty();
