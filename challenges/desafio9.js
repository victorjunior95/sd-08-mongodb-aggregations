db.trips.aggregate([
  {
    $match: { birthYear: { $ne: "" } },
  },
  {
    $addFields: {
      anoNascimentoInteiro: { $toInt: "$birthYear" },
    },
  },
  {
    $group: {
      _id: null,
      maiorAnoNascimento: {
        $max: "$anoNascimentoInteiro",
      },
      menorAnoNascimento: {
        $min: "$anoNascimentoInteiro",
      },
    },
  },
  {
    $project: {
      _id: 0,
    },
  },
]);
