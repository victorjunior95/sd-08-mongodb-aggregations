const favoriteActors = [
  "Sandra Bullock",
  "Tom Hanks",
  "Julia Roberts",
  "Kevin Spacey",
  "George Clooney",
];

db.movies.aggregate([
  { $match:
    {
      countries: "USA",
      "tomatoes.viewer.rating": { $gte: 3 },
    },
  },
  { $project:
    {
      num_favs: {
        $size: { $setIntersection: ["$cast", favoriteActors] },
      },
    },
  },
  { $sort:
    {
      num_favs: -1,
      "tomatoes.viewer.rating": -1,
      title: -1,
    },
  },
]);
