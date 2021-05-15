const aggregation = [
  // {
  //     $addFields: {
  //       newBirthYear: {$toInt: "$birthYear"},
  // },
  {
    $match: {
      birthYear: { $gte: 1 },
    },
  },
  {
    $group: {
      _id: "$birthYear",
      count: { $sum: 1 },
    },
  },
  {
    $group: {
      _id: "$_id.count",
      maiorAnoNascimento: { $max: "$_id" },
      menorAnoNascimento: { $min: "$_id" },
    },
  },
  { $project: { _id: 0, maiorAnoNascimento: 1, menorAnoNascimento: 1 } },
];
db.trips.aggregate(aggregation);
