db.trips.aggregate([
  {
    $match: {
      birthYear: {
        $nin: [""],
        $exists: 1,
      },
    },
  },
  {
    $group: {
      _id: { $toInt: "$birthYear" },
    },
  },
  {
    $group: {
      _id: null,
      maiorAnoNascimento: { $max: "$_id" },
      menorAnoNascimento: { $min: "$_id" },
    },
  },
  {
    $project: {
      _id: 0,
    },
  },
]);
