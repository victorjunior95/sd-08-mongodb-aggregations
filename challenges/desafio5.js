const cast = ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"];

db.movies.aggregate(
  [
    {
      $group: {
        _id: {
          titulo: "$title",
          pais: "$countries",
          nota: "$tomatoes",
          num_favs: {
            $setIntersection: ["$cast", cast],
          },
        },
      },
    },
    {
      $group: {
        _id: {
          titulo: "$_id.titulo",
          pais: "$_id.pais",
          nota: "$_id.nota",
          num_favs: {
            $cond: { if: { $isArray: "$_id.num_favs" }, then: { $size: "$_id.num_favs" }, else: 0 },
          },
        },
      },
    },
    {
      $match: {
        "_id.pais": "USA",
        "_id.nota.viewer.rating": {
          $gte: 3,
        },
      },
    },
    {
      $sort: {
        "_id.num_favs": -1,
        "_id.nota.viewer.rating": -1,
        "_id.titulo": -1,
      },
    },
    {
      $skip: 24,
    },
    {
      $project: {
        _id: 0,
        title: "$_id.titulo",
      },
    },
    {
      $limit: 1,
    },
  ],
);
