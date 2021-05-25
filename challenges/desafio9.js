db.trips.aggregate([
  { $match:
       { birthYear: { $ne: "" },
       },
  },
  { $group:
      {
        _id: "tantofaz",
        maiorAnoNascimento: { $max: { $toInt: "$birthYear" } },
        menorAnoNascimento: { $min: "$birthYear" },
      },
  },
  { $project:
      {
        _id: 0,
        maiorAnoNascimento: 1,
        menorAnoNascimento: 1,
      },
  },
]);
//  toInt: Transforma string em numero.
//  { $toInt: <expression> }
//  https://docs.mongodb.com/manual/reference/operator/aggregation/toInt/
