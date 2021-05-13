db.trips.aggregate(
  [
    {
      $match: {
        birthYear: {
          $ne: "",
        },
      },
    },
    {
      $addFields: {
        birth: {
          $toInt: "$birthYear",
        },
      },
    },
    {
      $group: {
        _id: null,
        maiorAnoNascimento: {
          $max: "$birth",
        },
        menorAnoNascimento: {
          $min: "$birth",
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
  ],
);
