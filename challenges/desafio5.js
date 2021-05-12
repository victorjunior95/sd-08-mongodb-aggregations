const act = ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"]

db.movies.aggregate([
  {
    $match: {
      $and: [
        {countries: "USA"},
        {"tomatoes.viewer.rating": {$gte: 3}}
      ]
    }
  },
])


const act = ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"]

db.movies.aggregate([
  {
    $match: {
      $and: [
        {countries: "USA"},
        {"tomatoes.viewer.rating": {$gte: 3}}

      ]
    }
  },
  {
    $group: {
      _id: {
        $or: [{cast:"Sandra Bullock" },{cast:"Tom Hanks" },{cast:"Julia Roberts" },{cast:"Kevin Spacey" },{cast:"George Clooney"}]
      },
      count: {$sum: 1}
    }
  }
])

