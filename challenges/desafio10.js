db.trips.aggregate([
  {
    $addFields: {
      duracaoEmMilisegundos: {
        $subtract: ["$stopTime", "$startTime"],
      },
    },
  },
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: { $avg: "$duracaoEmMilisegundos" },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: {
        $round: [{
          $divide: ["$duracaoMedia", 3600000], // 3600000 = 60 * 60 * 1000 => convertendo milisegundo para hora
        }, 2],
      },
    },
  },
]);
