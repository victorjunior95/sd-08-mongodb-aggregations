db.trips.aggregate([
  {
    /**
     * newField: The new field name.
     * expression: The new field expression.
     */
    $addFields: {
      diaDaSemana: { $dayOfWeek: "$startTime" },
    },
  },
  {
    $match: {
      diaDaSemana: 5,
    },
  },
  {
    $group: {
      _id: "$startStationName",
      total: { $sum: 1 },
    },
  },
  {
    /**
     * specifications: The fields to
     *   include or exclude.
     */
    $project: {
      nomeEstacao: "$_id",
      total: "$total",
      _id: 0,
    },
  },
  { $sort: { total: -1 } },
  {
    $limit: 1,
  },
]);
