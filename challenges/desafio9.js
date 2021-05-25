db.trips.aggregate([
  { $match:
       { birthYear: { $ne: "" },
       },
  },
  { $group:
      {
        _id: "tantofaz",
        maiorAnoNascimento: { $max: "$birthYear" },
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
