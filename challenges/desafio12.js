db.trips.aggregate([
  {
    $addFields: {
      // https://docs.mongodb.com/manual/reference/operator/aggregation/dayOfWeek
      startDayOfWeek: { $dayOfWeek: "$startTime" },
    },
  },
  {
    $group: {
      _id: "$startDayOfWeek",
      total: { $sum: 1 },
    },
  },
  {
    $sort: {
      total: -1,
    },
  },
  {
    $project: {
      _id: 0,
      diaDaSemana: "$_id",
      total: 1,
    },
  },
  {
    $limit: 1,
  },
  {
    $lookup: {
      from: "trips",
      let: { dayOfWeek: "$diaDaSemana" },
      pipeline: [
        {
          $match: {
            // https://docs.mongodb.com/manual/reference/operator/query/expr/
            // Consulta ao PR do colega Paulo Simões.
            $expr: {
              $eq: [{ $dayOfWeek: "$startTime" }, "$$dayOfWeek"],
            },
          },
        },
        {
          $group: {
            _id: "$startStationName",
            total: { $sum: 1 },
          },
        },
      ],
      as: "stationsWithMostTrips",
    },
  },
  // https://stackoverflow.com/questions/45724785/aggregate-lookup-total-size-of-documents-in-matching-pipeline-exceeds-maximum-d
  { $unwind: "$stationsWithMostTrips" },
  {
    $project: {
      nomeEstacao: "$stationsWithMostTrips._id",
      total: "$stationsWithMostTrips.total",
    },
  },
  {
    $sort: {
      total: -1,
    },
  },
  { $limit: 1 },
]);
