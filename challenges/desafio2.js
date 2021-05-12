db.movies.aggregate([
  {
    $match: {
      "imdb.rating": { $gte: 7 },
      genres: { $nin: ["Crime", "Horror"] },
      rated: { $in: ["PG", "G"] },
      languages: { $all: ["English", "Spanish"] },
    } },
  { $project: {
    _id: false,
    titulo: "$title",
    avaliacao: "$rated",
    notaImdb: "$imdb.rating",
    votosImdb: "$imdb.votes",
    ano: "$year",
  } },
]);
