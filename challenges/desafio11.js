db.trips.aggregate([{ $group: { _id: { $dayOfWeek: "$startTime" }, qty: { $sum: 1 } } }, { $project: { diaDaSemana: "$_id", total: "$qty", _id: 0 } }, { $sort: { total: -1 } }, { $limit: 1 }]);
