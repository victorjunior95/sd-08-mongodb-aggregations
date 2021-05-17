db.trips.aggregate([
  {
    $addFields: {
      stringDate: {
        $dateToString: {
          date: "$startTime",
        },
      },
    },
  },
  {
    $match: {
      stringDate: {
        $regex: /^2016-03-10.+/,
      },
    },
  },
  {
    $addFields: {
      difTime: {
        $divide: [
          { $subtract: [
            "$stopTime",
            "$startTime",
          ] },
          { $multiply: [
            1000, 60,
          ] },
        ],
      },
    },
  },
  {
    $group: {
      _id: "null",
      media: {
        $avg: "$difTime",
      },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: {
        $ceil: "$media",
      },
    },
  },
]);
