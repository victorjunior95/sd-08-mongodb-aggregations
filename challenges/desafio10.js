const horasEmMs = 3600000;

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
          horasEmMs,
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
]);
