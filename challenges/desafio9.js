db.trips.aggregate(
  [
    {
      $match: {
        birthYear: { $nin: [null, ""] },
      },
    },
    {
      $addFields: {
        birthYear_Int: { $toInt: "$birthYear" },
      },
    },
    {
      $group: {
        _id: null,
        maiorAnoNascimento: { $max: "$birthYear_Int" },
        menorAnoNascimento: { $min: "$birthYear_Int" },
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
  ],
);
