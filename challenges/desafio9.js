db.trips.aggregate([
  { $match: { birthYear: { $exists: true, $ne: "" } } },

  { $group: { _id: { $toInt: "$birthYear" } } },
]);
