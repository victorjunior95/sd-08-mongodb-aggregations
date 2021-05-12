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
    $group: {
      _id: "$diaDaSemana",
      total: { $sum: 1 },
    },
  },
  {
    /**
     * specifications: The fields to
     *   include or exclude.
     */
    $project: {
      diaDaSemana: "$_id",
      total: "$total",
      _id: 0,
    },
  },
  { $sort: { total: -1 } },
  {
    $limit: 1,
  },
]);
