db.trips.aggregate([
  {
    $group: {
      _id: {
        $dayOfWeek: "$startTime",
      },
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
      let: { dayWeek: "$_id" },
      pipeline: [
        {
          $match: {
            $expr: [
              {
                $eq: [{ $dayOfWeek: "$startTime" }, "$$dayWeek"],
              },
            ],
          },
        },
      ],
      as: "dias_mais_viagens",
    },
  },

]);
