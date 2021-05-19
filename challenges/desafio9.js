db.trips.aggregate([
  {
    $match: {
      birthYear: {
        $exists: true,
        $ne: "",
      },
    },
  }, {
    $addFields: {
      convertInt: {
        $toInt: "$birthYear",
      },
    },
  },
  {
    $group: {
      _id: null,
      count: {
        $sum: 1,
      },
      maiorAnoNascimento: { $max: "$convertInt" },
      menorAnoNascimento: { $min: "$convertInt" },
    },
  },
  {
    $sort: {
      _id: -1,
    },
  },
  {
    $project: {
      maiorAnoNascimento: 1,
      menorAnoNascimento: 1,
      _id: 0,
    },
  },
  {
    $limit: 1,
  },
]);
