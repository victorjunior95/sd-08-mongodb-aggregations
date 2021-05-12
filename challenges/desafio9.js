db.trips.aggregate([
  {
    $match: {
      birthYear: { $exists: 1, $ne: "" },
    },
  },
  {
    $group: {
      _id: null,
      maiorAnoNascimento: { $max: { $toInt: "$birthYear" } },
      menorAnoNascimento: { $min: { $toInt: "$birthYear" } },
    },
  },
  {
    /**
     * specifications: The fields to
     *   include or exclude.
     */
    $project: {
      _id: 0,
      menorAnoNascimento: 1,
      maiorAnoNascimento: 1,
    },
  },
]);
