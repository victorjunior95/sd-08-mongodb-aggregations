db.movies.createIndex( { awards: "text" } );

db.movies.aggregate([
    {$match:
    {$text:{$search:"won"},
    "imdb.rating":{$ne:""},
    "imdb.rating":{$lte:9.2}
    },
    {$group: 
        {
        _id: null,
        maior_rating:{$max:"$imdb.rating"},
        menor_rating:{$min:"$imdb.rating"},
        media:{$avg:"$imdb.rating"}, 
        desvio:{$stdDevSamp:"$imdb.rating"}
       }
        
    },
    {$project: {
        _id:0,
        maior_rating:1,
        menor_rating:1,
        media_rating:{$round:["$media",1]}, 
        desvio_padrao:{$trunc:["$desvio",1]},
        
    }}
    
]); 