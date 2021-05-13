db.trips.aggregate([
  {
    $match: {
      birthYear: {
        $gte: 0,
      },
    },
  },
  {
    $group: {
      _id: "",
      maiorAnoNascimento: {
        $max: "$birthYear",
      },
      menorAnoNascimento: {
        $min: "$birthYear",
      },
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
