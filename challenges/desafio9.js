db.trips.aggregate([
  {
    $match: {
      birthYear: {
        $ne: "",
      },
    },
  },
  {
    $addFields: {
      convertedYear: {
        $toInt: "$birthYear",
      },
    },
  },
  {
    $group: {
      _id: null,
      maiorAnoNascimento: { $max: "$convertedYear" },
      menorAnoNascimento: { $min: "$convertedYear" },
    },
  },
  {
    $project: {
      _id: 0,
    },
  },
]);
