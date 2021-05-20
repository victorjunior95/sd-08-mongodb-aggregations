db.trips.aggregate([
  { $match:
    {
      birthYear: { $ne: "" },
    },
  },
  { $group:
    {
      _id: null,
      menorAnoNascimento: { $min: { $toInt: "birthYear" } },
      maiorAnoNascimento: { $max: { $toInt: "birthYear" } },
    },
  },
  { $project:
    {
      menorAnoNascimento: 1,
      maiorAnoNascimento: 1,
      _id: 0,
    },
  },
]);
