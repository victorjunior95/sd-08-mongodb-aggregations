db.trips.aggregate([
  {
    $addFields:
    {
      duracao:
      {
        $divide:
        [
          {
            $subtract:
            [
              "$stopTime",
              "$startTime",
            ],
          },
          3600000,
        ],
      },
    },
  },
  {
    $group:
    {
      _id: "$usertype",
      duracao_media: { $avg: "$duracao" },
    },
  },
  {
    $project:
    {
      _id: 0,
      tipo: "$_id",
      duracao_media:
      {
        $round:
        [
          "$duracao_media",
          2,
        ],
      },
    },
  },
  {
    $sort: { duracao_media: 1 },
  },
]);
