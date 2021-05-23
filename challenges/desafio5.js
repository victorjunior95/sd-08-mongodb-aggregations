const favoriteActors = ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"];

db.movies.aggregate(
  [
    {
      $match: {
        $and: [
          { countries: "USA" },
          { "tomatoes.viewer.rating": { $gte: 3 } },
          { cast: { $in: favoriteActors } },
        ],
      },
    },
    {
      $project: {
        _id: 0,
        title: 1,
        num_favs: { $size: { $setIntersection: [favoriteActors, "$cast"] } },
      },
    },
    {
      $project: {
        num_favs: 0,
      },
    },
    {
      $sort: { num_favs: -1, "tomatoes.viewer.rating": -1, title: -1 },
    },
    {
      $skip: 24,
    },
  ],
).pretty();
