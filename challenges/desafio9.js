// A partir da coleção trips, determine o menor e o maior ano de nascimento
//   A) Guarde essa informação para utilizar mais tarde
//   B) Não considere documentos com valores vazios ("") e em que o campo não existe
// Obs. Utilize o operador $toInt para converter de string para valor inteiro

db.trips.aggregate([
  {
    $match: {
      birthYear: {
        $exists: true,
        $ne: "",
      },
    },
  },
  {
    $group: {
      _id: null,
      maiorAnoNascimento: { $max: { $toInt: "$birthYear" } },
      menorAnoNascimento: { $min: { $toInt: "$birthYear" } },
    },
  },
  {
    $project: {
      _id: 0,
      maiorAnoNascimento: 1,
      menorAnoNascimento: 1,
    },
  },
]);
