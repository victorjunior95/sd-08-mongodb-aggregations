// Reference:  https://stackoverflow.com/questions/14213636/conditional-grouping-with-exists-inside-cond

db.movies.aggregate([
  { $match:
    { countries:
      { $in: ["USA"] },
    "tomatoes.viewer.rating": { $gte: 3 },
    cast: { $exists: true } } },
  { $addFields:
    { num_favs:
      { $let: {
        vars: {
          casts: ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"] },
        in: {
          $size: {
            $setIntersection: ["$$casts", "$cast"],
          },
        },
      },
      },
    },
  },
  { $sort: { num_favs: -1, "tomatoes.viewer.rating": -1, title: -1 } },
  { $skip: 24 },
  { $limit: 1 },
  { $project: { title: 1, _id: 0 } }]);
