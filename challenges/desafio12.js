db.trips.aggregate(
  { $addFields: {
    diaDaSemana: {
      $dayOfWeek: "$startTime",
    } } },
  { $group: {
    _id: "$diaDaSemana",
    count: { $sum: 1 } } },
  { $project: {
    _id: 0,
    diaDaSemana: "$_id",
    total: "$count" } },
  { $sort: { total: -1 } },
  { $limit: 1 },
  { $lookup: {
    from: "trips",
    let: { dia: "$diaDaSemana" },
    pipeline: [{ $match: {
      $expr: {
        $eq: [
          "$$dia",
          { $dayOfWeek: "$startTime" },
        ] } } },
    { $group: {
      _id: "$startStationName",
      total: { $sum: 1 },
    } }],
    as: "estacoes" } },
  { $unwind: "$estacoes" },
  { $project: {
    _id: 0,
    nomeEstacao: "$estacoes._id",
    total: "$estacoes.total" } },
  { $sort: { total: -1 } },
  { $limit: 1 },
);
