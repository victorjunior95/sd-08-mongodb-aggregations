db.air_routes.aggregate([
  { $match:
        { airplane: { $in: ["747", "380"] } },
  },
  { $lookup:
        { from: "air_alliances",
          localField: "airline.name",
          foreignField: "airlines",
          as: "alliance" },
  },
  //  é necessário utilizar duas coleções diferentes...(lookup é "um JOIN")
  { $match:
      { "alliance.name": { $exists: true } },
  },
  { $unwind: "$alliance" },
  { $group:
      { _id: "$alliance.name",
        totalRotas: { $sum: 1 } },
  },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);

//  The $lookup takes a document with the following fields:
/* {
   $lookup:
     {
       from: <collection to join>,
       localField: <field from the input documents>,
       foreignField: <field from the documents of the "from" collection>,
       as: <output array field>
     }
} */
//  https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/

//  consultei o repositório de Rita Jeveaux
//  https://github.com/tryber/sd-08-mongodb-aggregations/pull/44/files
