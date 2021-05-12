db.movies.aggregate([
  {
    $match: {
      rating: { $gte: 7 },
      genero: { $nin: ["Crime", "Horror"] },
      clasificacao: { $in: ["PG", "G"] },
      languages: { $all: ["English", "Spanish"] },
    },
  },
]);
