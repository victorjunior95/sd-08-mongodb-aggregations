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
      duracaoMedia: { $avg: "$duracao" },
    },
  },
  {
    $project:
    {
      _id: 0,
      tipo: "$_id",
      duracaoMedia:
      {
        $round:
        [
          "$duracaoMedia",
          2,
        ],
      },
    },
  },
]);
