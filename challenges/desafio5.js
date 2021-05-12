db.movies.aggregate([
  { $match: { countries: "USA" } },
  { $match: { cast: { $exists: true } } },
  { $match: { "tomatoes.viewer.rating": { $gte: 3 } } },
  { $addFields: {
    num_favs: {
      $let: {
        vars: {
          desirableCast: ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"],
        },
        in: {
          $size: {
            $setIntersection: ["$$desirableCast", "$cast"],
          },
        },
      },
    },
  } },
  { $sort: { num_favs: -1, "tomatoes.viewer.rating": -1, title: -1 } },
  { $project: { title: 1, _id: 0 } },
  { $skip: 24 },
  { $limit: 1 },
]);
