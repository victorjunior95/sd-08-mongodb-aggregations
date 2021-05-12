db.trips.aggregate(
  [
    {
      $match: {
        $expr: {
          $ne: ["$birthYear", ""] },
      },
    },
    {
      $addFields: {
        birthYearNumber: { $toInt: "$birthYear" },
      },
    },
    {
      $group: {
        _id: null,
        maiorAnoNascimento: { $max: "$birthYearNumber" },
        menorAnoNascimento: { $min: "$birthYearNumber" },
      },
    },
    {
      $project: {
        _id: 0,
        maiorAnoNascimento: 1,
        menorAnoNascimento: 1,
      },
    },
  ],
);
