db.movies.aggregate(
  [
    {
      $match: {
        $and: [
          { countries: "USA" },
          { "tomatoes.viewer.rating": { $gte: 3 } },
        ],
      },
    },
    {
      $project: {
        _id: 0,
        cast: 1,
        favorite_actors: ["Julia Roberts"],
        num_favs: { $setIntersection: ["$favorite_actors", "$cast"] },
      },
    },
    {
      $match: { num_favs: { size: 1 } },
    },
  ],
).pretty();
