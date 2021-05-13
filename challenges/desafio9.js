db.trips.aggregate([
  {
    $match: {
      birthYear: { $ne: "" },
    },
  },
  {
    $project: {
      transformeNumero: { $toInt: "$birthYear" },
    },
  },
  {
    $group: {
      _id: null,
      maiorValor: { $max: "$transformeNumero" },
      menorValor: { $min: "$transformeNumero" },
    },
  },
  {
    $project: {
      _id: false,
      maiorAnoNascimento: "$maiorValor",
      menorAnoNascimento: "$menorValor",
    },
  },
]);
