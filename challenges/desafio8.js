db.air_routes.aggregate([
  {
    $lookup: {
      from: "air_alliances",
      localField: "airplane",
      foreignField: "",
    },
  },
]);
