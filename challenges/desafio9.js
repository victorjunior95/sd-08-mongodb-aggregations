db.trips.aggregate([
  {
    $match: {
      birthYear: {
        $ne: "",
        $exists: true,
      },
    },
  },
  {
    $group: {
      _id: null,
      // https://docs.mongodb.com/manual/reference/operator/aggregation/toInt/
      maiorAnoNascimento: { $max: { $toInt: "$birthYear" } },
      menorAnoNascimento: { $min: { $toInt: "$birthYear" } },
    },
  },
  {
    $project: {
      _id: 0,
      maiorAnoNascimento: 1,
      menorAnoNascimento: 1,
    },
  },
]);
