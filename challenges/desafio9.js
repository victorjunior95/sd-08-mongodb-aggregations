db.trips.aggregate([
  {
    $match: { birthYear: { $exists: true, $ne: "" } },
  },
  {
    $project: {
      birthYear: { $toInt: "$birthYear" },
    },
  },
  {
    $group: {
      _id: null,
      maiorAnoNascimento: { $max: "$birthYear" },
      menorAnoNascimento: { $min: "$birthYear" },
    },
  },
]);
