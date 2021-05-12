const atores = ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"];
db.movies.aggregate([
  { $match:
    { countries: "USA",
      "tomatoes.viewer.rating": { $gte: 3 } },
  },
  { $addFields: {
    num_favs: { $size: { $setIntersection: [atores, "$cast"] } } },
  },
  { $sort:
    { num_favs: -1, "_id.viewer_rating": -1, "_id.title": -1 },
  },
  { $project:
    { title: "$_id.title", _id: 0 },
  },
  { $skip: 24 },
  { $limit: 1 },
]);
