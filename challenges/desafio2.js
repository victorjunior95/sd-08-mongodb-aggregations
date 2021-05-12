db.movies
  .aggregate([
    {
      $match: {
        $and: [
          { "imdb.rating": { $gte: 7 } },
          { genres: { $ne: "Crime" } },
          { genres: { $ne: "Horror" } },
          { $or: [{ rated: "PG" }, { rated: "G" }] },
          { $and: [{ languages: "English" }, { languages: "Spanish" }] },
        ],
      },
    },
    {
      $project: {
        _id: 0,
        titulo: "$title",
        avaliado: "$rated",
        notaIMDB: "$imdb.rating",
        votosIMDB: "$imdb.votes",
        ano: "$year",
      },
    },
  ]);
