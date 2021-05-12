db.air_routes.aggregate([
  {
    $lookup: {
      from: "air_alliances",
      localField: "airline.name",
      foreignField: "airlines",
      as: "airplanes",
    },
  },
  {
    $match: {
      airplane: { $in: ["747", "380"] },
      "airplane.name": { $exists: true },
    },
  },
  {
    $unwind: "$airplanes",
  },


]);
