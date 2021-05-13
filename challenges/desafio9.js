db.trips.aggregate(
  [{
    $match: {
      $and: [
        { birthYear: { $exists: true } },
        { birthYear: { $ne: "" } },
      ],
    },
  },
  {
    $addFields: {
      anoNascimento: { $toInt: "$birthYear" },
    },
  },
  {
    $group: {
      _id: null,
      maiorAnoNascimento: { $max: "$anoNascimento" },
      menorAnoNascimento: { $min: "$anoNascimento" },
    },
  },
  {
    $project: {
      _id: 0,
      maiorAnoNascimento: 1,
      menorAnoNascimento: 1,
    },
  }],
);
