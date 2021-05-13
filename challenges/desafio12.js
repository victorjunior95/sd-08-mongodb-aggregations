db.trips.aggregate([
  {
    $addFields: {
      daysWeek: {
        $dayOfWeek: "$startTime",
      },
    },
  },
  {
    $group: {
      _id: "$daysWeek",
      total: { $sum: 1 },
    },
  },
  {
    $sort: {
      total: -1,
    },
  },
  {
    $limit: 1,
  },
  {
    $lookup: {
      from: "trips",
      let: { daysWeek: "$_id" },
      pipeline: [
        {
          $match: {
            $expr: [
              {
                $eq: [{ $dayOfWeek: "$startTime" }, "$$daysWeek"],
              },
            ],
          },
        },
      ],
      as: "dias_mais_viagens",
    },
  },

]);

// ================

db.trips.aggregate([
  {
    $addFields: {
      daysWeek: {
        $dayOfWeek: "$startTime",
      },
    },
  },
  {
    $group: {
      _id: "$daysWeek",
      total: { $sum: 1 },
    },
  },
  {
    $sort: {
      total: -1,
    },
  },
  {
    $limit: 1,
  },
]);
