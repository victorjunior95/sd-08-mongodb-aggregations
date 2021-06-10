// Retorne todos os filmes (coleção movies) através de uma pipeline, que:
//   A. imdb.rating seja ao menos 7
//   B. genres não contenha 'Crime' ou 'Horror'
//   C. rated seja igual a 'PG' ou 'G'
//   D. languages contém 'English' e 'Spanish'

db.movies.aggregate([
  {
    $match: {
      "imdb.rating": { $gte: 7 },
      genres: {
        $nin: [
          "Crime",
          "Horror",
        ],
      },
      rated: {
        $in: [
          "PG",
          "G",
        ],
      },
      languages: {
        $all: [
          "English",
          "Spanish",
        ],
      },
    },
  },
]);
