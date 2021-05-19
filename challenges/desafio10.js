db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: {
        $avg: {
          $subtract: ["$stopTime", "$startTime"],
        },
      },
    },
  },

  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: {
        $round: [{ $divide: ["$duracaoMedia", 3.6e6] }, 2],
      },
    },
  },

  {
    $sort: {
      duracaoMedia: 1,
    },
  },
]);

//divisor 3.6e+6 encontrado via Pesquisa Google "transformar milisegundos em horas" in https://www.google.com/search?q=transformar+milisegundos+em+horas&oq=transformar+milise&aqs=chrome.2.0l3j69i57j0l4.4444j0j1&sourceid=chrome&ie=UTF-8
