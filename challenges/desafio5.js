const lista = [
  "Sandra Bullock",
  "Tom Hanks",
  "Julia Roberts",
  "Kevin Spacey",
  "George Clooney",
];
db.movies.aggregate([
  {
    $match: {
      countries: "USA" ,
      "tomatoes.viewer.rating": { $gte: 3 } ,
      cast:{$exists:true},
      
    },
  },
  { $project: { num_favs: {$size: {
    $setIntersection: ["$cast", lista] }}, title: 1, "tomatoes.viewer.rating": 1, _id:0 } },
  { $sort: { num_favs: -1, "tomatoes.viewer.rating": -1, title: -1 } },
  {$skip:24},
  {$limit:1},
  {$project:{ title: 1}}
]);
